const { it, expect } = require('@jest/globals');
const convertTemp = require('./index');

describe('Temperature', () => {

  it('convertTemp must return an string value with the scale change', () => {
    expect(convertTemp(45, 'c', 'f')).toBe('113');
  });

});
