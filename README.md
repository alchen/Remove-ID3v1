# Remove ID3v1

[![Build Status](https://travis-ci.org/alchen/Remove-ID3v1.svg?branch=master)](https://travis-ci.org/alchen/Remove-ID3v1)

This library provides a mean to strip a file of its ID3v1 tag, when present.

There are two useful functions:

```
const Remover = require('../src/remove-id3v1');
const buffer = fs.readFileSync('sample.mp3');

// Both of the functions take either a Buffer or an ArrayBuffer as the argument

// Test whether an id3v1 tag is present in the file
var hasTag = Remover.hasTag(buffer); 

// Strips the tag and return the same file in a new buffer
var newBuffer = Remover.removeTag(buffer);
```
