const tagLength = 128;

class Remover {
  static getArrayBuffer(input) {
    if (input instanceof Buffer) {
      return input.buffer;
    } else if (input instanceof ArrayBuffer) {
      return input;
    }

    throw new Error('First argument should be an instance of ArrayBuffer or Buffer');
  }

  static hasTag(input) {
    const buffer = this.getArrayBuffer(input);
    const bufferLength = buffer.byteLength;

    if (bufferLength < tagLength) {
      return false;
    }

    const tagSpace = new Uint8Array(buffer, bufferLength - tagLength);

    if (!(tagSpace[0] === 0x54 && tagSpace[1] === 0x41 && tagSpace[2] === 0x47)) {
      return false;
    }

    return true;
  }

  static removeTag(input) {
    const buffer = this.getArrayBuffer(input);
    const bufferLength = buffer.byteLength;

    if (!this.hasTag(buffer)) {
      return buffer.slice();
    }

    return buffer.slice(0, bufferLength - tagLength);
  }
}

module.exports = Remover;
