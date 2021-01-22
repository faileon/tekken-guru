// @ts-nocheck
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

import {TGMenuItem} from './types/ui.types';
import {APP_MENU} from './config/navigation.config';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, take} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Move, OldMove} from './types';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'tg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({width: 0}),
            animate('175ms ease-out', style({width: '*'}))
          ]
        ),
        transition(
          ':leave',
          [
            style({width: '*'}),
            animate('175ms ease-in', style({width: 0}))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  public isMobileSidebarOpen = false;
  public readonly menuItems: TGMenuItem[] = APP_MENU;

  private newMoves$: Subject<Move[]> = new Subject<Move[]>();

  @ViewChild('mobileNav')
  private mobileNav!: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  public outsideClick(event: MouseEvent): void {
    if (!this.mobileNav?.nativeElement.contains(event.target)) {
      this.isMobileSidebarOpen = false;
    }
  }


  constructor(private firestore: AngularFirestore) {

    /*const leroyMoves = [
      {
        'video': 'moves/leroy/001.mp4',
        'hit': {'damage': [55], 'move': ['M']},
        'name': 'Rage Art',
        'frames': {'startUp': 20, 'onBlock': -22, 'onCounterHit': 0, 'onHit': 0},
        'notation': 'During Rage,d/f+3+4',
        '_id': '001'
      }, {
        'hit': {'damage': [10, 5, 25], 'onCounterHit': 'KND', 'move': ['M', 'M', 'M'], 'onHit': 'KND'},
        'frames': {'onBlock': 2, 'startUp': 15, 'onCounterHit': 25, 'onHit': 25},
        'name': 'Rage Drive',
        'video': 'moves/leroy/002.mp4',
        'notation': 'During Rage,f+1+2',
        '_id': '002'
      }, {
        'hit': {'move': ['H', 'M', 'H', 'H', 'H', 'H', 'M'], 'onHit': 'KND', 'damage': [7, 7, 3, 3, 3, 3, 15], 'onCounterHit': 'KND'},
        'notation': '1,1,1+2,1',
        'isKeyMove': true,
        'name': 'Chain Punch: Sheath',
        'video': 'moves/leroy/003.mp4',
        'frames': {'onBlock': -16, 'startUp': 10, 'onCounterHit': 2, 'onHit': 2},
        '_id': '003'
      }, {
        'video': 'moves/leroy/004.mp4',
        'frames': {'onBlock': -1, 'onHit': 5, 'startUp': 10, 'onCounterHit': 5},
        'name': 'Front Palm',
        'hit': {'move': ['H', 'H'], 'damage': [7, 9]},
        'notation': '1,2',
        '_id': '004'
      }, {
        'frames': {'onCounterHit': 8, 'onHit': 8, 'startUp': 10, 'onBlock': -6},
        'hit': {'damage': [7, 9, 17], 'move': ['H', 'H', 'H']},
        'notation': '1,2,1',
        'video': 'moves/leroy/005.mp4',
        'name': 'Front Palm Pulsing Fist',
        '_id': '005'
      }, {
        'hit': {'damage': [7, 9, 21], 'onHit': 'KND', 'onCounterHit': 'KND', 'move': ['H', 'H', 'H']},
        'name': 'Front Palm Xuan Feng Jiao',
        'video': 'moves/leroy/006.mp4',
        'notation': '1,2,3',
        'frames': {'startUp': 10, 'onBlock': -6, 'onCounterHit': 25, 'onHit': 25},
        'properties': ['SCREW', 'LOW CRUSH'],
        '_id': '006'
      }, {
        'name': 'Front Palm Snap Kick to Hermit',
        'punishment': {'isStanding': true},
        'notation': '1,2,4',
        'frames': {'onHit': 3, 'startUp': 10, 'onBlock': -9, 'onCounterHit': 3},
        'video': 'moves/leroy/007.mp4',
        'hit': {'move': ['H', 'H', 'M'], 'damage': [7, 9, 11]},
        '_id': '007'
      }, {
        'frames': {'onHit': 7, 'startUp': 12, 'onBlock': -7, 'onCounterHit': 7},
        'video': 'moves/leroy/008.mp4',
        'notation': '2,2',
        'name': 'Needle Elbow',
        'hit': {'move': ['H', 'H'], 'damage': [10, 20]},
        'punishment': {'isStanding': true},
        '_id': '008'
      }, {
        'notation': '2,1,2,1',
        'name': 'Claws of Fury',
        'video': 'moves/leroy/009.mp4',
        'hit': {'onHit': 'KND', 'move': ['H', 'M', 'H', 'M'], 'onCounterHit': 'LAUNCH', 'damage': [10, 12, 17, 21]},
        'frames': {'onHit': 7, 'startUp': 12, 'onCounterHit': 7, 'onBlock': -13},
        '_id': '009'
      }, {
        'video': 'moves/leroy/010.mp4',
        'notation': '3,3',
        'frames': {'onBlock': -15, 'startUp': 15, 'onCounterHit': 15, 'onHit': 2},
        'hit': {'damage': [14, 17], 'move': ['M', 'L'], 'onCounterHit': 'KND'},
        'name': 'Hissing Snake',
        '_id': '010'
      }, {
        'video': 'moves/leroy/011.mp4',
        'name': 'Falling Bamboo',
        'hit': {'move': ['H', 'M'], 'damage': [15, 13]},
        'frames': {'onBlock': -13, 'onCounterHit': 3, 'startUp': 12, 'onHit': 3},
        'notation': '4,4',
        'punishment': {'isStanding': true},
        '_id': '011'
      }, {
        'notation': '1+2,1+2,1',
        'punishment': {'isStanding': true},
        'video': 'moves/leroy/012.mp4',
        'frames': {'onBlock': -17, 'onCounterHit': 99, 'startUp': 14, 'onHit': 99},
        'name': 'Chain Punch: Stem',
        'hit': {'move': ['H', 'H', 'H', 'H', 'H', 'H', 'M'], 'onHit': 'KND', 'damage': [9, 3, 3, 3, 3, 3, 27], 'onCounterHit': 'KND'},
        '_id': '012'
      }, {
        'frames': {'startUp': 99},
        'video': 'moves/leroy/013.mp4',
        'notation': '3+4',
        'name': 'Hermit',
        'hit': {'move': [], 'damage': []},
        '_id': '013'
      }, {
        'video': 'moves/leroy/014.mp4',
        'notation': 'During Hermit,1',
        'frames': {'onCounterHit': 99, 'onHit': 4, 'onBlock': -6, 'startUp': 24},
        'name': 'Chain Punch: Stem',
        'hit': {'onCounterHit': 'KND', 'damage': [17], 'move': ['M']},
        '_id': '014'
      }, {
        'hit': {'move': ['H', 'H'], 'damage': [14, 20], 'onHit': 'KND', 'onCounterHit': 'KND'},
        'notation': 'During Hermit,2,1',
        'video': 'moves/leroy/015.mp4',
        'name': 'Horizontal Elbow Strike',
        'frames': {'startUp': 12, 'onBlock': -4, 'onHit': 99, 'onCounterHit': 99},
        'properties': ['SCREW'],
        '_id': '015'
      }, {
        'video': 'moves/leroy/016.mp4',
        'hit': {'damage': [8, 16], 'move': ['L', 'M']},
        'name': 'Stampeding Dragon',
        'notation': 'During Hermit,3,4',
        'frames': {'onCounterHit': 0, 'onHit': 0, 'startUp': 12, 'onBlock': -15},
        '_id': '016'
      }, {
        'name': 'Cautios Dragon',
        'frames': {'onBlock': -14, 'startUp': 11, 'onCounterHit': 99, 'onHit': 99},
        'notation': 'During Hermit,4,1+2',
        'hit': {'onHit': 'KND', 'damage': [13, 15, 20], 'onCounterHit': 'KND', 'move': ['M', 'M', 'M']},
        'video': 'moves/leroy/017.mp4',
        '_id': '017'
      }, {
        'video': 'moves/leroy/018.mp4',
        'properties': ['WALL BOUNCE'],
        'notation': 'During Hermit,1+2',
        'frames': {'onCounterHit': 99, 'onHit': 99, 'startUp': 15, 'onBlock': -10},
        'hit': {'move': ['M', 'M', 'M'], 'onHit': 'KND', 'onCounterHit': 'KND', 'damage': [5, 5, 20]},
        'name': 'Twin Dragon Strike',
        '_id': '018'
      }, {
        'hit': {'onHit': 'SCREW', 'onCounterHit': 'KND', 'damage': [17], 'move': ['H']},
        'frames': {'onBlock': 0, 'onHit': 15, 'onCounterHit': 99, 'startUp': 14},
        'properties': ['SCREW'],
        'video': 'moves/leroy/019.mp4',
        'notation': 'During Hermit,f+1',
        'name': 'Villain Slayer',
        '_id': '019'
      }, {
        'properties': ['LOW CRUSH'],
        'notation': 'During Hermit,f+4',
        'hit': {'move': ['M'], 'onHit': 'SCREW', 'damage': [21], 'onCounterHit': 'KND'},
        'video': 'moves/leroy/020.mp4',
        'name': 'Duan Tou Xuan Feng Jiao',
        'frames': {'onCounterHit': 99, 'onHit': 99, 'onBlock': 0, 'startUp': 26},
        '_id': '020'
      }, {
        'frames': {'onCounterHit': 99, 'onHit': 7, 'startUp': 20, 'onBlock': 4},
        'name': 'Prayer Fist',
        'notation': 'During Hermit,b+1',
        'hit': {'onHit': 'CROUCH', 'onCounterHit': 'LAUNCH', 'damage': [21], 'move': ['M']},
        'video': 'moves/leroy/021.mp4',
        '_id': '021'
      }, {
        'hit': {'move': ['L'], 'onHit': 'CROUCH', 'damage': [17], 'onCounterHit': 'KND'},
        'notation': 'During Hermit,b+4',
        'video': 'moves/leroy/022.mp4',
        'properties': ['HIGH CRUSH'],
        'frames': {'onCounterHit': 99, 'startUp': 20, 'onBlock': -13, 'onHit': 4},
        'name': 'Razor Sweep',
        '_id': '022'
      }, {
        'notation': 'During Hermit,u_d',
        'hit': {'move': [], 'damage': []},
        'video': 'moves/leroy/023.mp4',
        'frames': {'startUp': 99},
        'name': 'Nimble Shift',
        '_id': '023'
      }, {
        'frames': {'onCounterHit': 16, 'onHit': 16, 'startUp': 100, 'onBlock': -26},
        'video': 'moves/leroy/024.mp4',
        'name': 'Go Sugar',
        'notation': '2+3',
        'hit': {'damage': [16], 'move': ['L']},
        '_id': '024'
      }, {
        'video': 'moves/leroy/025.mp4',
        'notation': 'f+2,3,4',
        'name': 'Lone Dragon Storm to Hermit',
        'frames': {'onBlock': -6, 'onHit': 8, 'onCounterHit': 99, 'startUp': 14},
        'hit': {'onCounterHit': 'KND', 'damage': [15, 15, 20], 'move': ['H', 'M', 'M']},
        '_id': '025'
      }, {
        'notation': 'f+3,1+2,4',
        'hit': {'damage': [17, 5, 5, 5, 20], 'onHit': 'KND', 'onCounterHit': 'KND', 'move': ['M', 'H', 'H', 'H', 'M']},
        'video': 'moves/leroy/026.mp4',
        'frames': {'onBlock': -16, 'onCounterHit': 99, 'startUp': 14, 'onHit': 99},
        'name': 'Strike of the Five Percepts',
        '_id': '026'
      }, {
        'name': 'Lao Weng Xuan Feng Jiao',
        'hit': {'damage': [14, 24], 'onHit': 'KND', 'onCounterHit': 'KND', 'move': ['M', 'H']},
        'punishment': {'isStanding': true},
        'notation': 'f+4,4',
        'video': 'moves/leroy/027.mp4',
        'properties': ['SCREW', 'LOW CRUSH'],
        'frames': {'startUp': 16, 'onCounterHit': 99, 'onHit': 99, 'onBlock': -6},
        '_id': '027'
      }, {
        'name': 'Piercing Charge',
        'hit': {'onHit': 'KND', 'move': ['M'], 'onCounterHit': 'KND', 'damage': [80], 'onBlock': 'UB'},
        'notation': 'f+3+4,F',
        'video': 'moves/leroy/028.mp4',
        'frames': {'startUp': 117},
        '_id': '028'
      }, {
        'frames': {'onBlock': -1, 'startUp': 13, 'onCounterHit': 5, 'onHit': 5},
        'isKeyMove': true,
        'name': 'Chopping Chain Fist',
        'hit': {'move': ['M', 'H'], 'damage': [12, 9]},
        'video': 'moves/leroy/029.mp4',
        'notation': 'd/f+1,1',
        '_id': '029'
      }, {
        'video': 'moves/leroy/030.mp4',
        'hit': {'damage': [12, 16], 'move': ['M', 'M']},
        'name': 'Chopping Snap Kick to Hermit',
        'notation': 'd/f+1,4',
        'punishment': {'isStanding': true},
        'frames': {'startUp': 13, 'onCounterHit': 3, 'onBlock': -9, 'onHit': 3},
        '_id': '030'
      }, {
        'video': 'moves/leroy/031.mp4',
        'name': 'Rising Dragons',
        'notation': 'd/f+2,1+2',
        'frames': {'onBlock': -18, 'onCounterHit': 99, 'startUp': 15, 'onHit': 99},
        'hit': {'damage': [7, 5, 10], 'onHit': 'LAUNCH', 'move': ['M', 'H', 'M'], 'onCounterHit': 'LAUNCH'},
        'punishment': {'isStanding': true},
        '_id': '031'
      }, {
        'hit': {'onCounterHit': 'KND', 'damage': [14, 12, 25], 'onHit': 'KND', 'move': ['M', 'H', 'M']},
        'notation': 'd/f+3,1,1+2',
        'frames': {'onHit': 99, 'onCounterHit': 99, 'startUp': 16, 'onBlock': -13},
        'video': 'moves/leroy/032.mp4',
        'name': 'Poison Strike',
        '_id': '032'
      }, {
        'hit': {'damage': [14], 'move': ['M']},
        'name': 'Snap Kick to Hermit',
        'notation': 'd/f+4',
        'video': 'moves/leroy/033.mp4',
        'frames': {'onBlock': -6, 'onCounterHit': 6, 'onHit': 6, 'startUp': 13},
        '_id': '033'
      }, {
        'hit': {'move': ['M', 'M'], 'damage': [14, 14]},
        'notation': 'd/f+4,3',
        'video': 'moves/leroy/034.mp4',
        'name': 'Snap Kick Knee',
        'frames': {'startUp': 13, 'onCounterHit': 99, 'onHit': 7, 'onBlock': -9},
        '_id': '034'
      }, {
        'frames': {'onBlock': -14, 'onCounterHit': 99, 'onHit': 99, 'startUp': 24},
        'notation': 'd/f+1+2',
        'name': 'Cornered Dragon',
        'video': 'moves/leroy/035.mp4',
        'properties': ['POWER CRUSH', 'WALL BOUNCE'],
        'hit': {'move': ['M'], 'damage': [23]},
        '_id': '035'
      }, {
        'name': 'Ru Huan Snap Kick to Hermit',
        'notation': 'd+1,2,4',
        'video': 'moves/leroy/036.mp4',
        'frames': {'onHit': 3, 'startUp': 10, 'onBlock': -9, 'onCounterHit': 3},
        'hit': {'damage': [5, 8, 11], 'move': ['M', 'M', 'M']},
        '_id': '036'
      }, {
        'frames': {'startUp': 15, 'onHit': -2, 'onCounterHit': 99, 'onBlock': -13},
        'properties': ['HIGH CRUSH'],
        'hit': {'damage': [15, 11], 'move': ['L', 'L']},
        'name': 'Falling Fist Sweep',
        'notation': 'd+2,4',
        'video': 'moves/leroy/037.mp4',
        '_id': '037'
      }, {
        'notation': 'd+3,2',
        'name': 'Twin Snake Strike to Hermit',
        'hit': {'move': ['L', 'H'], 'damage': [10, 10]},
        'video': 'moves/leroy/038.mp4',
        'frames': {'onCounterHit': 8, 'onHit': 8, 'onBlock': -3, 'startUp': 16},
        '_id': '038'
      }, {
        'video': 'moves/leroy/039.mp4',
        'hit': {'move': ['L', 'M'], 'damage': [9, 16]},
        'frames': {'startUp': 14, 'onBlock': -11, 'onCounterHit': 1, 'onHit': 1},
        'notation': 'd+4,4',
        'name': 'Razor Kick to Hermit',
        '_id': '039'
      }, {
        'punishment': {'isStanding': true},
        'notation': 'd+1+2',
        'name': 'Chanhui Zhang',
        'hit': {'damage': [21], 'onCounterHit': 'KND', 'move': ['M'], 'onHit': 'CROUCH'},
        'video': 'moves/leroy/040.mp4',
        'frames': {'onBlock': -4, 'onHit': 6, 'onCounterHit': 99, 'startUp': 17},
        '_id': '040'
      }, {
        'frames': {'onBlock': 0, 'onHit': 8, 'onCounterHit': 8, 'startUp': 16},
        'notation': 'd/b+1,3',
        'name': 'Shadow Raccoon Swing',
        'video': 'moves/leroy/041.mp4',
        'hit': {'damage': [12, 17], 'move': ['M', 'H']},
        '_id': '041'
      }, {
        'frames': {'onCounterHit': 99, 'startUp': 16, 'onHit': 99, 'onBlock': -10},
        'notation': 'd/b+1,1+2',
        'hit': {'damage': [12, 25], 'move': ['M', 'M'], 'onHit': 'KND', 'onCounterHit': 'KND'},
        'video': 'moves/leroy/042.mp4',
        'name': 'Shadow Double Fist Punch',
        '_id': '042'
      }, {
        'notation': 'd/b+3,1+2',
        'hit': {'onCounterHit': 'KND', 'damage': [12, 29], 'move': ['L', 'M'], 'onHit': 'KND'},
        'video': 'moves/leroy/043.mp4',
        'isKeyMove': true,
        'frames': {'onHit': 99, 'onBlock': -16, 'startUp': 18, 'onCounterHit': 99},
        'name': 'Twin Dragon Acceptance',
        '_id': '043'
      }, {
        'notation': 'd/b+4',
        'properties': ['HIGH CRUSH'],
        'hit': {'move': ['L'], 'damage': [13]},
        'video': 'moves/leroy/044.mp4',
        'name': 'Fan Sweep',
        'frames': {'onHit': -3, 'startUp': 17, 'onCounterHit': 99, 'onBlock': -14},
        '_id': '044'
      }, {
        'video': 'moves/leroy/045.mp4',
        'frames': {'onCounterHit': 99, 'onBlock': -11, 'onHit': 99, 'startUp': 32},
        'name': 'Tan Sau Shui Yue Tu',
        'hit': {'onCounterHit': 'KND', 'move': ['M'], 'damage': [25], 'onHit': 'KND'},
        'notation': 'd/b+1+2',
        '_id': '045'
      }, {
        'video': 'moves/leroy/046.mp4',
        'name': 'Hermit\'s Fist',
        'hit': {'move': ['M'], 'damage': [17], 'onCounterHit': 'THROW'},
        'notation': 'b+1',
        'frames': {'startUp': 11, 'onHit': 5, 'onBlock': -6, 'onCounterHit': 99},
        '_id': '046'
      }, {
        'video': 'moves/leroy/047.mp4',
        'name': 'Knee Snap',
        'frames': {'startUp': 11},
        'hit': {'damage': [25], 'move': ['TH']},
        'notation': 'During Counter Hit,b+1',
        '_id': '047'
      }, {
        'frames': {'onCounterHit': 99, 'onBlock': -6, 'startUp': 18, 'onHit': 99},
        'hit': {'move': ['H'], 'onCounterHit': 'KND', 'damage': [21], 'onHit': 'KND'},
        'name': 'Feiche Xuan Fen Jiao',
        'properties': ['SCREW'],
        'notation': 'b+3',
        'video': 'moves/leroy/048.mp4',
        '_id': '048'
      }, {
        'frames': {'onBlock': -8, 'onHit': 11, 'startUp': 17, 'onCounterHit': 11},
        'notation': 'b+4',
        'properties': ['SCREW', 'HOMING'],
        'name': 'Zhuan Shen Jiao',
        'video': 'moves/leroy/049.mp4',
        'hit': {'onHit': 'SCREW', 'move': ['M'], 'onCounterHit': 'SCREW', 'damage': [21]},
        '_id': '049'
      }, {
        'frames': {'startUp': 12, 'onHit': 2, 'onBlock': -9, 'onCounterHit': 99},
        'hit': {'damage': [17], 'onCounterHit': 'KND', 'move': ['M']},
        'video': 'moves/leroy/050.mp4',
        'name': 'Outcast Arrow',
        'notation': 'b+1+2',
        '_id': '050'
      }, {
        'video': 'moves/leroy/051.mp4',
        'name': 'Pulsing Fist',
        'frames': {'onCounterHit': 5, 'startUp': 16, 'onHit': 5, 'onBlock': -9},
        'hit': {'damage': [17], 'move': ['H']},
        'notation': 'u/f+1',
        '_id': '051'
      }, {
        'properties': ['WALL BOUNCE', 'LOW CRUSH'],
        'name': 'Zhuan Shen Long Fang Quan',
        'frames': {'onBlock': 1, 'onHit': 99, 'startUp': 24, 'onCounterHit': 99},
        'hit': {'damage': [25], 'onHit': 'KND', 'move': ['M'], 'onCounterHit': 'KND'},
        'video': 'moves/leroy/052.mp4',
        'notation': 'u/f+2',
        '_id': '052'
      }, {
        'video': 'moves/leroy/053.mp4',
        'notation': 'u/f+3',
        'name': 'Floating Kick',
        'frames': {'startUp': 20, 'onBlock': -8, 'onHit': 99, 'onCounterHit': 99},
        'hit': {'onHit': 'KND', 'move': ['M'], 'damage': [21], 'onCounterHit': 'KND'},
        '_id': '053'
      }, {
        'hit': {'onCounterHit': 'KND', 'damage': [22], 'onHit': 'KND', 'move': ['M']},
        'video': 'moves/leroy/054.mp4',
        'name': 'Floating Axe Drop',
        'frames': {'onHit': 99, 'onCounterHit': 99, 'onBlock': -9, 'startUp': 21},
        'notation': 'u/f+4',
        '_id': '054'
      }, {
        'punishment': {'isStanding': true, 'isCrouching': true},
        'video': 'moves/leroy/055.mp4',
        'name': 'Biting Dragons',
        'hit': {'damage': [8, 10, 25], 'move': ['M', 'M', 'M'], 'onHit': 'KND', 'onCounterHit': 'KND'},
        'notation': 'u/f+3+4,1+2',
        'frames': {'startUp': 14, 'onCounterHit': 99, 'onHit': 99, 'onBlock': -13},
        '_id': '055'
      }, {
        'video': 'moves/leroy/056.mp4',
        'frames': {'onCounterHit': 99, 'onHit': 99, 'startUp': 15, 'onBlock': -13},
        'name': 'Cleansing Arrow',
        'hit': {'onCounterHit': 'KND', 'damage': [8, 15], 'onHit': 'KND', 'move': ['M', 'M']},
        'notation': 'f,F+2,2',
        '_id': '056'
      }, {
        'hit': {'onCounterHit': 'KND', 'onHit': 'KND', 'damage': [23], 'move': ['H']},
        'properties': ['LOW CRUSH'],
        'name': 'Viper Bow Kick',
        'video': 'moves/leroy/057.mp4',
        'frames': {'onBlock': -2, 'onHit': 99, 'startUp': 19, 'onCounterHit': 99},
        'notation': 'f,F+3',
        '_id': '057'
      }, {
        'hit': {'damage': [16], 'move': ['M']},
        'notation': 'f,F+4',
        'video': 'moves/leroy/058.mp4',
        'name': 'Sacrum Severance Snap Kick to Hermit',
        'frames': {'startUp': 17, 'onHit': 9, 'onBlock': -4, 'onCounterHit': 9},
        '_id': '058'
      }, {
        'name': 'Sacrum Severance',
        'notation': 'f,F+4,2',
        'hit': {'onCounterHit': 'LAUNCH', 'move': ['M', 'M'], 'damage': [16, 21], 'onHit': 'KND'},
        'video': 'moves/leroy/059.mp4',
        'frames': {'onBlock': -14, 'startUp': 17, 'onCounterHit': 9, 'onHit': 9},
        '_id': '059'
      }, {
        'name': 'Dragon Elbow Crash',
        'video': 'moves/leroy/060.mp4',
        'notation': 'f,F+1+2',
        'hit': {'onCounterHit': 'KND', 'damage': [25], 'move': ['M'], 'onHit': 'KND'},
        'frames': {'onCounterHit': 99, 'startUp': 18, 'onBlock': -9, 'onHit': 99},
        '_id': '060'
      }, {
        'hit': {'move': ['M'], 'damage': [30], 'onHit': 'KND', 'onCounterHit': 'KND'},
        'notation': 'f,f,f+3',
        'video': 'moves/leroy/061.mp4',
        'name': 'Dragon\'s Heel',
        'frames': {'onBlock': 7, 'onCounterHit': 99, 'startUp': 26, 'onHit': 99},
        '_id': '061'
      }, {
        'frames': {'onCounterHit': 6, 'onBlock': -6, 'startUp': 13, 'onHit': 6},
        'punishment': {'isCrouching': true},
        'notation': 'While rising,1,4',
        'name': 'Elbow Snap Kick to Hermit',
        'video': 'moves/leroy/062.mp4',
        'hit': {'damage': [14, 16], 'move': ['M', 'M']},
        '_id': '062'
      }, {
        'video': 'moves/leroy/063.mp4',
        'notation': 'While rising,2',
        'punishment': {'isCrouching': true},
        'hit': {'onHit': 'KND', 'move': ['M', 'M', 'M'], 'damage': [8, 3, 12], 'onCounterHit': 'KND'},
        'frames': {'startUp': 15, 'onCounterHit': 99, 'onBlock': -14, 'onHit': 99},
        'name': 'Arrow Shower',
        '_id': '063'
      }, {
        'video': 'moves/leroy/064.mp4',
        'frames': {'startUp': 15, 'onHit': 99, 'onBlock': -16, 'onCounterHit': 99},
        'notation': 'While rising,3,1+2,4',
        'hit': {'damage': [17, 5, 5, 5, 20], 'move': ['M', 'H', 'H', 'H', 'M'], 'onCounterHit': 'KND', 'onHit': 'KND'},
        'name': 'Strike of the Five Percepts',
        '_id': '064'
      }, {
        'notation': 'While crouching,d/f+4,1',
        'video': 'moves/leroy/065.mp4',
        'name': 'Reverse Cross Kick',
        'hit': {'onCounterHit': 'LAUNCH', 'damage': [14, 15], 'move': ['L', 'M'], 'onHit': 'LAUNCH'},
        'frames': {'onBlock': -13, 'onCounterHit': 99, 'startUp': 15, 'onHit': 99},
        'properties': ['HIGH CRUSH'],
        '_id': '065'
      }, {
        'frames': {'onBlock': -12, 'startUp': 18, 'onHit': 4, 'onCounterHit': 12},
        'hit': {'move': ['L'], 'damage': [16], 'onHit': 'CROUCH'},
        'notation': 'Sidestep,4',
        'video': 'moves/leroy/066.mp4',
        'name': 'Lone Dragon Slice',
        '_id': '066'
      }, {
        'name': 'Tremor Punch',
        'hit': {'move': ['L', 'L', 'L', 'L'], 'damage': [13, 5, 5, 15]},
        'frames': {'startUp': 17, 'onHit': -2, 'onBlock': -13, 'onCounterHit': -2},
        'video': 'moves/leroy/067.mp4',
        'notation': 'Opponent down,d/b+2,1+2',
        '_id': '067'
      }, {
        'name': 'Master\'s Lesson',
        'video': 'moves/leroy/068.mp4',
        'frames': {'onCounterHit': 99, 'onBlock': -7, 'startUp': 22, 'onHit': 99},
        'notation': 'd/f+2+3',
        'hit': {'damage': [10, 10, 15], 'move': ['M', 'M', 'M'], 'onHit': 'LAUNCH', 'onCounterHit': 'LAUNCH'},
        '_id': '068'
      }, {
        'notation': '1+3+4',
        'video': 'moves/leroy/069.mp4',
        'frames': {'onBlock': 99, 'onCounterHit': 99, 'onHit': 99, 'startUp': 22},
        'hit': {'move': [], 'damage': []},
        'name': 'Taunt',
        '_id': '069'
      }, {
        'video': 'moves/leroy/070.mp4',
        'name': '10 hit Combo',
        'frames': {'onHit': 0, 'startUp': 16, 'onBlock': -11, 'onCounterHit': 0},
        'hit': {'damage': [14, 12, 7, 53, 7, 5, 10, 25], 'move': ['M', 'H', 'L', 'H', 'H', 'H', 'M', 'H', 'M', 'M']},
        'notation': 'd/f+3,1,4,1+2,2,1+2,1+2',
        '_id': '070'
      }, {
        'name': 'Devastating Chain Punch',
        'hit': {'onHit': 'THROW', 'damage': [35], 'move': ['H']},
        'notation': '1+3',
        'frames': {'startUp': 12},
        'video': 'moves/leroy/071.mp4',
        '_id': '071'
      }, {
        'video': 'moves/leroy/072.mp4',
        'frames': {'startUp': 12},
        'name': 'Devastating Chain Punch',
        'notation': 'f+1+3',
        'hit': {'move': ['H'], 'damage': [35], 'onHit': 'THROW'},
        '_id': '072'
      }, {
        'notation': '2+4',
        'hit': {'move': ['H'], 'damage': [35], 'onHit': 'THROW'},
        'name': 'Corkscew Strike',
        'video': 'moves/leroy/073.mp4',
        'frames': {'startUp': 12},
        '_id': '073'
      }, {
        'hit': {'onHit': 'THROW', 'damage': [35], 'move': ['H']},
        'frames': {'startUp': 12},
        'name': 'Corkscrew Strike',
        'notation': 'f+2+4',
        'video': 'moves/leroy/074.mp4',
        '_id': '074'
      }, {
        'video': 'moves/leroy/075.mp4',
        'hit': {'move': ['H'], 'damage': [40], 'onHit': 'THROW'},
        'notation': 'Approach from left side,f+1+3',
        'name': 'Devastating Chain Punch',
        'frames': {'startUp': 12},
        '_id': '075'
      }, {
        'notation': 'Approach from right side,f+2+4',
        'video': 'moves/leroy/076.mp4',
        'hit': {'move': ['H'], 'damage': [40], 'onHit': 'THROW'},
        'frames': {'startUp': 12},
        'name': 'Corkscrew Strike',
        '_id': '076'
      }, {
        'notation': 'Approach from behind,f+1+3',
        'hit': {'move': ['H'], 'damage': [50], 'onHit': 'THROW'},
        'video': 'moves/leroy/077.mp4',
        'frames': {'startUp': 12},
        'name': 'Lone Dragon\'s Rage',
        '_id': '077'
      }, {
        'notation': 'u/f+1+2',
        'name': 'Lian Jin Xuan Feng Jiao',
        'hit': {'damage': [40], 'onHit': 'THROW', 'move': ['H']},
        'frames': {'startUp': 12},
        'video': 'moves/leroy/078.mp4',
        '_id': '078'
      }, {
        'video': 'moves/leroy/079.mp4',
        'name': 'Twin Dragon Gate',
        'notation': 'b+2',
        'hit': {'onHit': 'PARRY', 'move': [], 'damage': []},
        'frames': {'startUp': 3},
        '_id': '079'
      }, {
        'video': 'moves/leroy/080.mp4',
        'hit': {'damage': [5, 5, 5, 5, 20], 'move': ['M', 'H', 'H', 'H', 'H']},
        'frames': {'startUp': 18},
        'name': 'Chain Punch: Branch',
        'notation': 'After Parry Succeeds,2',
        '_id': '080'
      }];*/

    /*let leroyMappedMoves = leroyMoves.map(move => {
      return {
        ...move,
        frameData: {
          startUp: {
            frames: move.frames.startUp,
          },
          onBlock: {
            frames: move.frames.onBlock ? this.genArray(move.hit.damage.length, 99, move.frames.onBlock) : [],
            property: this.genArray(move.hit.damage.length, '', move.hit.onBlock ?? '')
          },
          onHit: {
            frames: move.frames.onHit ? this.genArray(move.hit.damage.length, 99, move.frames.onHit) : [],
            property: this.genArray(move.hit.damage.length, '', move.hit.onHit ?? '')
          },
          onCounterHit: {
            frames: move.frames.onCounterHit ? this.genArray(move.hit.damage.length, 99, move.frames.onCounterHit) : [],
            property: this.genArray(move.hit.damage.length, '', move.hit.onCounterHit ?? '')
          },
        },
        frames: undefined
      } as Move;
    });*/

    /*const enterDragon: Move = {
      _id: '051',
      name: 'Enter The Dragon',
      frameData: {
        startUp: {
          frames: 20
        },
        onBlock: {
          frames: [-10],
          property: ['']
        },
        onHit: {
          frames: [3],
          property: ['']
        },
        onCounterHit: {
          frames: [3],
          property: ['']
        }
      },
      hit: {
        damage: [20],
        move: ['M']
      },
      notation: 'u/b+2',
      video: 'moves/leroy/051.mp4'
    };
    leroyMappedMoves = this.insertMoveToList(leroyMappedMoves, enterDragon, 50, 'leroy');
    const chakraFist: Move = {
      _id: '062',
      name: 'Chakra Fist',
      frameData: {
        startUp: {
          frames: 20
        },
        onBlock: {
          frames: [-6],
          property: ['']
        },
        onHit: {
          frames: [],
          property: ['LAUNCH']
        },
        onCounterHit: {
          frames: [],
          property: ['LAUNCH']
        }
      },
      hit: {
        damage: [20],
        move: ['M']
      },
      notation: 'u/b+2',
      video: 'moves/leroy/051.mp4'
    };
    this.newMoves = this.insertMoveToList(leroyMappedMoves, chakraFist, 61, 'leroy');*/

    // REMAPING HERE
    /*this.firestore.collection<OldMove>(`characters/king/movelist`)
      .valueChanges({idField: '_id'})
      .pipe(
        map(moves => {
          return moves.map(move => {
            const size = move.notation.match(/,/g)?.length ?? 1;

            const newMove: Move = {
              ...move,
              frameData: {
                startUp: {
                  frames: move.frames.startUp,
                },
                onBlock: {
                  frames: move.frames.onBlock ? this.genArray(size, 99, move.frames.onBlock) : [],
                  property: this.genArray(size, '', move.hit.onBlock ?? '')
                },
                onHit: {
                  frames: move.frames.onHit ? this.genArray(size, 99, move.frames.onHit) : [],
                  property: this.genArray(size, '', move.hit.onHit ?? '')
                },
                onCounterHit: {
                  frames: move.frames.onCounterHit ? this.genArray(size, 99, move.frames.onCounterHit) : [],
                  property: this.genArray(size, '', move.hit.onCounterHit ?? '')
                },
              },
            };

            // @ts-ignore
            delete newMove.frames;

            return newMove;
          });
        })
      )
      .pipe(take(1))
      .subscribe(moves => {
        this.newMoves$.next(moves);
      });*/


  }

  // debug functions for inserting documents
  private genArray<T>(size: number, fillWith: T, lastEl: T): T[] {
    const arr = Array(size).fill(fillWith);
    if (arr.length > 0) {
      arr[arr.length - 1] = lastEl;
    } else {
      arr[0] = lastEl;
    }
    return arr;
  }

  private insertMoveToList(list: Move[], newMove: Move, position: number, characterId: string): Move[] {
    const copy = [...list];
    const firstHalf = list.splice(0, position);
    const secondHalf = copy.splice(position).map(move => {
      const newId = this.incrementMoveId(move._id);
      return {...move, _id: newId, video: `moves/${characterId}/${newId}.mp4`};
    });


    return [
      ...firstHalf,
      newMove,
      ...secondHalf
    ];
  }

  private incrementMoveId(moveId: string): string {
    const newNumberId = parseInt(moveId, 10) + 1;
    return newNumberId.toString().padStart(3, '0');

  }

  async ngOnInit(): Promise<void> {

    /*this.newMoves$.pipe(take(1)).subscribe(async (moves) => {
      // console.log('new moves', moves);
      console.log('remapping moves');
      for (const move of moves) {
        const id = move._id;
        delete move._id;
        // @ts-ignore
        delete move.hit.onBlock;
        // @ts-ignore
        delete move.hit.onHit;
        // @ts-ignore
        delete move.hit.onCounterHit;


        // @ts-ignore
        const collection = 'characters/king/movelist';
        await this.firestore.collection(collection).doc(id).delete();
        await this.firestore.collection(collection).doc(id).set(move);
      }
      console.log('DONE');
    });*/

    const movelist = [];
    for (const move of movelist) {
      const id = move._id;
      delete move._id;
      console.log('adding', id);
      // await this.firestore.collection<Move>('characters/jin/movelist').doc(id).set(move);
    }
  }
}
