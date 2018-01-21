const Remover = require('../src/remove-id3v1');
const fs = require('fs');
const path = require('path');

const assetFolder = path.join(__dirname, 'assets');

describe('Remove ID3v1', () => {
  it('should be able to remove ID3v1 tags when present', () => {
    const songBuffer = fs.readFileSync(path.join(assetFolder, 'sample_id3v1.mp3'));
    const newBuffer = Remover.removeTag(songBuffer);

    expect(songBuffer.byteLength).toEqual(83300);
    expect(newBuffer.byteLength).toEqual(83172);
    expect(songBuffer).not.toBe(newBuffer);
  });

  it('should do nothing when ID3v1 tag is not present', () => {
    const songBuffer = fs.readFileSync(path.join(assetFolder, 'sample_tagless.mp3'));
    const newBuffer = Remover.removeTag(songBuffer);

    expect(songBuffer.byteLength).toEqual(83172);
    expect(newBuffer.byteLength).toEqual(83172);
    expect(songBuffer).not.toBe(newBuffer);
  });
});
