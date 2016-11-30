class Remover {
  _removeTag() {
    const tagLength = 128;
    let bufferLength = this.arrayBuffer.byteLength;

    if (bufferLength < tagLength) {
      return false;
    }

    let tagSpace = new Uint8Array(this.arrayBuffer, bufferLength - tagLength);

    if (!(tagSpace[0] === 0x54 && tagSpace[1] === 0x41 && tagSpace[2] === 0x47)) {
      return;
    }

    this.arrayBuffer = this.arrayBuffer.slice(0, bufferLength - tagLength);
  }

  constructor(buffer) {
    if (!buffer || typeof buffer !== 'object' || !('byteLength' in buffer)) {
      throw new Error('First argument should be an instance of ArrayBuffer or Buffer');
    }

    if (buffer instanceof Buffer) {
      this.arrayBuffer = buffer.buffer;
    } else {
      this.arrayBuffer = buffer;
    }
    this._removeTag();
  }

  getBlob() {
    return new Blob([this.arrayBuffer], {type: 'audio/mpeg'});
  }

  getURL() {
    return URL.createObjectURL(this.getBlob());
  }
}

module.exports = Remover;
