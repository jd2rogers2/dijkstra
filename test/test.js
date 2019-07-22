require('mocha');
var expect = require('chai').expect;
const { getFastestRoute } = require('../solution');

const points = {
  a: {b: 6, d: 1},
  b: {a: 6, c: 5, d: 2, e: 2},
  c: {b: 5, e: 5},
  d: {a: 1, b: 2, e: 1},
  e: {d: 1, b: 2, c: 5}
}

//
//
// !!!!! these should return the paths instead
//
//

describe('getFastestRoute', () => {
  it('from a to c is 7', () => {
    expect(getFastestRoute(points, 'a', 'c')[1]).to.equal(7);
  });

  it('from a to e is 2', () => {
    expect(getFastestRoute(points, 'a', 'e')[1]).to.equal(2);
  });

  it('from d to c is 6', () => {
    expect(getFastestRoute(points, 'd', 'c')[1]).to.equal(6);
  });

  it('from a to b is 7', () => {
    expect(getFastestRoute(points, 'a', 'b')[1]).to.equal(3);
  });
});
