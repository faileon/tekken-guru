// CSV PARSER FOR FRAME DATA
import * as csv from 'csv-parser';
import { createReadStream } from 'fs';
import { Move, WeakSide } from '../src/app/types/move.type';
import {
  HitLevel,
  HitProperty,
  MoveProperty,
} from '../src/app/types/property.type';
import * as fbadmin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

//
//{
//    id: '38',
//    notation: 'd/f+1,4,1~2',
//    name: 'Full Body Grande Combo',
//    startup: '13,17,18',
//    damage: '11,17,23',
//    range: 'M,H,M',
//    'block-frames': '-3,-7,-10',
//    'block-property': '',
//    'hit-frames': '8,4,23',
//    'hit-property': ',,KND',
//    'counterhit-frames': '',
//    'counterhit-property': '',
//    'recovery-frames': '21,25,26',
//    notes: 'Spike',
//    'punishment-standing': 'FALSE',
//    'punishment-crouching': 'FALSE',
//    TORNADO: 'FALSE',
//    'HEAT ENGAGER': 'FALSE',
//    'POWER CRUSH': 'FALSE',
//    HOMING: 'FALSE',
//    'LOW CRUSH': 'FALSE',
//    'HIGH CRUSH': 'FALSE',
//    'WALL BREAK': 'FALSE',
//    'WALL SPLAT': 'FALSE',
//    'WALL CRUSH': 'FALSE',
//    CHIP: 'FALSE',
//    'FLOOR BREAK': 'FALSE',
//    'THROW 1': 'FALSE',
//    'THROW 2': 'FALSE',
//    'THROW 1+2': 'FALSE'
//  },

type CsvMove = {
  id: string;
  notation: string;
  name: string;
  startup: string;
  damage: string;
  'chip-damage': string;
  range: string;
  'block-frames': string;
  'block-property': string;
  'hit-frames': string;
  'hit-property': string;
  'counterhit-frames': string;
  'counterhit-property': string;
  'recovery-frames': string;
  'active-frames': string;
  reach: string;
  notes: string;
  'punishment-standing': string;
  'punishment-crouching': string;
  TORNADO: string;
  'HEAT ENGAGER': string;
  'POWER CRUSH': string;
  HOMING: string;
  'LOW CRUSH': string;
  'HIGH CRUSH': string;
  'WALL BREAK': string;
  'WALL SPLAT': string;
  'WALL CRUSH': string;
  CHIP: string;
  'FLOOR BREAK': string;
  'THROW 1': string;
  'THROW 2': string;
  'THROW 1+2': string;
  'weak-side': string;
};

const delimiter = ',';
const convertStrFrames = (frames: string) =>
  frames
    .split(delimiter)
    .filter((f) => !!f)
    .map((f) => Number(f))
    .filter((f) => !Number.isNaN(f));

const convertStrProperties = <T = string>(props: string) =>
  props.split(delimiter) as T[];

const getMoveProperties = (item: CsvMove) =>
  Object.entries(item).reduce((acc, curr) => {
    const [key, value] = curr;
    const isTruthy = value === 'TRUE';

    const prop = (
      {
        TORNADO: 'TORNADO',
        'HEAT ENGAGER': 'HEAT ENGAGER',
        'POWER CRUSH': 'POWER CRUSH',
        HOMING: 'HOMING',
        'LOW CRUSH': 'LOW CRUSH',
        'HIGH CRUSH': 'HIGH CRUSH',
        'WALL BREAK': 'WALL BREAK',
        'WALL SPLAT': 'WALL SPLAT',
        'WALL CRUSH': 'WALL CRUSH',
        CHIP: 'CHIP',
        'FLOOR BREAK': 'FLOOR BREAK',
        'THROW 1': 'THROW 1',
        'THROW 2': 'THROW 2',
        'THROW 1+2': 'THROW 1+2',
      } as Record<keyof CsvMove, MoveProperty>
    )[key];

    if (prop && isTruthy) {
      acc.push(prop);
    }

    return acc;
  }, new Array<MoveProperty>());

const fillArray = <T>(value: string, defaultValue = '') => {
  const len = value.split(delimiter).length;
  return Array(len).fill(defaultValue) as T[];
};

const results: Move[] = [];
// TODO: JUST REPLACE CHARACTER NAME HERE, NAME THE CSV THE SAME, ENJOY
const characterName = 'azucena';
createReadStream(`./tools/data/${characterName}.csv`)
  .pipe(csv()) //
  .on('data', (item: CsvMove) => {
    if (item.notation) {
      const id = item.id.padStart(3, '0');
      // when counterhit-* is not defined, take hit-*
      const chframes = item['counterhit-frames'] || item['hit-frames'];
      const chproperty = item['counterhit-property'] || item['hit-property'];
      results.push({
        _id: id,
        notation: item.notation,
        hit: {
          damage: convertStrFrames(item.damage),
          move: convertStrProperties(item.range) as HitLevel[],
          chipDamage: convertStrFrames(item['chip-damage']),
        },
        frameData: {
          startUp: {
            frames: convertStrFrames(item.startup),
          },
          onBlock: {
            frames: convertStrFrames(item['block-frames']),
            // when block-property is not defined, fill it with empt strings according to frames
            property:
              item['block-property'].length > 0
                ? convertStrProperties<HitProperty>(item['block-property'])
                : fillArray<HitProperty>(item['block-frames']),
          },
          onHit: {
            frames: convertStrFrames(item['hit-frames']),
            property:
              item['hit-property'].length > 0
                ? convertStrProperties<HitProperty>(item['hit-property'])
                : fillArray<HitProperty>(item['hit-frames']),
          },
          onCounterHit: {
            frames: convertStrFrames(chframes),
            property:
              chproperty.length > 0
                ? convertStrProperties(chproperty)
                : fillArray<HitProperty>(chframes),
          },
          recovery: {
            frames: convertStrFrames(item['recovery-frames']),
          },
          active: {
            frames: convertStrFrames(item['active-frames']),
          },
        },
        weakSide: convertStrProperties<WeakSide>(item['weak-side']).filter(
          (ws) => !!ws,
        ),
        reach: convertStrFrames(item['reach']),
        properties: getMoveProperties(item),
        name: item.name,
        video: `moves/${characterName}/${id}.mp4`,
        punishment: {
          isStanding: item['punishment-standing'] === 'TRUE',
          isCrouching: item['punishment-crouching'] === 'TRUE',
        },
      });
    }
  })
  .on('end', async () => {
    console.log('ITEMS ARE', results.length);
    // for (const move of results) {
    //   console.log(move);
    // }
    // return;

    // create firebase instances
    const app = fbadmin.initializeApp();
    const db = getFirestore(app, 'tekken8');

    // batch insert
    const batch = db.batch();
    for (const move of results) {
      batch.set(db.doc(`characters/azucena/movelist/${move._id}`), move);
    }
    await batch.commit();
    // for (const move of results) {
    //   console.log('ADD', move);
    //   await db
    //     .collection('characters/azucena/movelist')
    //     .doc(move._id)
    //     .set(move);
    //
    //   // ----------------
    //   // console.log(JSON.stringify(move, null, 4));
    //   // getFirestore('tekken8');
    //   // const firebaseConfig = {}
    //   // const app = initializeApp(firebaseConfig)
    //   // const db = getFirestore(app);
    //   // setDoc(doc(db, 'characters/azucena/movelist', '001'), {});
    // }
  });
