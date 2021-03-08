export const appendBufferAsync = (sourceBuffer: SourceBuffer, chunk: ArrayBuffer): Promise<void> => {
  return new Promise(resolve => {
    sourceBuffer.appendBuffer(chunk);
    sourceBuffer.onupdateend = e => {
      sourceBuffer.onupdateend = null;
      resolve();
    };
  });
};

export const createSequenceSourceBuffer = (mediaSource: MediaSource): SourceBuffer => {
  const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4D4028"');
  sourceBuffer.mode = 'sequence';
  return sourceBuffer;
};
