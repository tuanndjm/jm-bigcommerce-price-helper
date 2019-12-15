'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('getHelloWorld function test', () => {
    it('should return Hello world!', () => {
        var result = index.getHelloWorld('Hello world!');
        expect(result).to.equal('Hello world!');
    });
});