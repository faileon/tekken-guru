import * as functions from 'firebase-functions';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as ffmpeg from 'fluent-ffmpeg/index';
import * as ffmpegStaticPath from 'ffmpeg-static';
import * as ffProbeStatic from 'ffprobe-static';
import {FfmpegCommand} from 'fluent-ffmpeg';
import * as admin from 'firebase-admin';
import {v4 as uuidv4} from 'uuid';
admin.initializeApp();


const promisifyCommand = (command: FfmpegCommand): Promise<void> =>
  new Promise((resolve, reject) => {
    command
      .on('end', resolve)
      .on('error', reject)
      .run();
  });


export const generateVideoThumbnail = functions.region('europe-west1').storage.object().onFinalize(async (object) => {
  const filePath = object.name!;
  const fileName = path.basename(filePath);
  const contentType = object.contentType; //mime type video/mp4

  // Exit if this is triggered on a file that is not video.
  if (!contentType?.startsWith('video/')) {
    return;
  }

  // get video from the bucket
  const bucket = admin.storage().bucket(object.bucket);
  const tempVideoFilePath = path.join(os.tmpdir(), fileName);
  await bucket.file(filePath).download({destination: tempVideoFilePath});

  // thumbnail vars
  const thumbFileName = `${path.basename(filePath, path.extname(fileName))}_thumb.png`; //<videoname without extension>_thumb.png
  const thumbTempFolder = os.tmpdir();
  const thumbTempFilePath = path.join(thumbTempFolder, thumbFileName);
  const thumbStorageFilePath = path.join(path.dirname(filePath), thumbFileName);

  // let ffmpeg take a screenshot
  const thumbnailCommand = ffmpeg(tempVideoFilePath)
    .setFfmpegPath(ffmpegStaticPath)
    .setFfprobePath(ffProbeStatic.path)
    .outputOptions(['-f image2', '-vframes 1', '-vcodec png', '-f rawvideo', '-s 214x124', '-ss 00:00:00.100'])
    .output(thumbTempFilePath);

  // run the command
  await promisifyCommand(thumbnailCommand);

  // upload the thumbnail
  await bucket.upload(
    thumbTempFilePath,
    {
      destination: thumbStorageFilePath,
      metadata: {
        metadata :{
          firebaseStorageDownloadTokens: uuidv4(),
        }
      },
    });

  // remove temp files
  fs.unlinkSync(tempVideoFilePath);
  fs.unlinkSync(thumbTempFilePath);

  return;
});

