describe("Remove ID3v1", function() {
  const Remover = require('../src/remove-id3v1');
  const fs = require('fs');
  const path = require('path');
  const assetFolder = path.join(__dirname, 'assets');

  it("should be able to remove ID3v1 tags when present", function() {
    let songBuffer = fs.readFileSync(path.join(assetFolder, 'sample_id3v1.mp3'));
    expect(songBuffer.byteLength).toEqual(83300);

    const remover = new Remover(songBuffer);
    expect(remover.arrayBuffer.byteLength).toEqual(83172);
  });

  it("should do nothing when ID3v1 tag is not present", function() {
    let songBuffer = fs.readFileSync(path.join(assetFolder, 'sample_tagless.mp3'));
    expect(songBuffer.byteLength).toEqual(83172);

    const remover = new Remover(songBuffer);
    expect(remover.arrayBuffer.byteLength).toEqual(83172);
  });
});
