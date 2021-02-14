const { assert } = require('chai');
const blitz = require('../');
const d6rolls = require('./d6rolls');
const d20rolls = require('./d20rolls');

it('performs a blitz', () => {
  const actual = blitz(5, 4);

  // console.log(JSON.stringify(actual));

  assert.isObject(actual);
  assert.isNumber(actual.startingAttackers);
  assert.isNumber(actual.startingDefenders);
  assert.isNumber(actual.lostAttackers);
  assert.isNumber(actual.lostDefenders);
  assert.isNumber(actual.remainingAttackers);
  assert.isNumber(actual.remainingDefenders);
  assert.isString(actual.winner);
  assert.isArray(actual.rounds);
  assert.isArray(actual.rounds[0]);
  assert.isArray(actual.rounds[0][0]);
  assert.isArray(actual.rounds[0][1]);
  assert.isNumber(actual.rounds[0][2]);
  assert.isNumber(actual.rounds[0][3]);
  assert.isNumber(actual.rolls);
});

it('stop loss', () => {
  const options = { stopLoss: 1, rolls: d6rolls };

  const actual = blitz(5, 4, options);

  const expected = {
    startingAttackers: 5,
    startingDefenders: 4,
    lostAttackers: 4,
    lostDefenders: 2,
    remainingAttackers: 1,
    remainingDefenders: 2,
    winner: null,
    rounds: [
      [[4, 4, 2], [6, 1], 4, 3],
      [[5, 2, 1], [4, 2], 3, 2],
      [[3, 3], [5, 4], 1, 2]
    ],
    rolls: 14
  };

  assert.deepEqual(actual, expected);
});

it('d20', () => {
  const options = { diceSides: 20, rolls: d20rolls };

  const actual = blitz(5, 4, options);

  const expected = {
    startingAttackers: 5,
    startingDefenders: 4,
    lostAttackers: 1,
    lostDefenders: 4,
    remainingAttackers: 4,
    remainingDefenders: 0,
    winner: 'attacker',
    rounds: [
      [[17, 5, 2], [19, 4], 4, 3],
      [[19, 14, 2], [10, 1], 4, 1],
      [[17, 15, 14], [14], 4, 0]
    ],
    rolls: 14
  };

  assert.deepEqual(actual, expected);
});

it('max dice', () => {
  const options = {
    maxAttackDice: 10,
    maxDefendDice: 9,
    rolls: d6rolls
  };

  const actual = blitz(52, 42, options);

  // console.log(JSON.stringify(actual));

  const expected = {
    startingAttackers: 52,
    startingDefenders: 42,
    lostAttackers: 52,
    lostDefenders: 19,
    remainingAttackers: 0,
    remainingDefenders: 23,
    winner: 'defender',
    rounds: [
      [[6, 5, 4, 4, 4, 2, 2, 2, 1, 1], [6, 6, 5, 4, 4, 3, 3, 2, 1], 43, 42],
      [[5, 5, 4, 3, 3, 3, 2, 2, 1, 1], [6, 5, 5, 4, 4, 2, 1, 1, 1], 37, 39],
      [[6, 6, 5, 3, 3, 2, 1, 1, 1, 1], [4, 4, 4, 3, 2, 1, 1, 1, 1], 33, 34],
      [[6, 5, 5, 5, 5, 5, 4, 3, 2, 2], [6, 6, 5, 4, 4, 3, 2, 1, 1], 30, 28],
      [[6, 6, 5, 5, 5, 5, 4, 4, 3, 3], [6, 6, 5, 5, 4, 4, 2, 1, 1], 26, 23],
      [[3, 3, 2, 2, 2, 2, 1, 1, 1, 1], [6, 6, 5, 5, 5, 5, 3, 3, 1], 17, 23],
      [[6, 4, 4, 3, 3, 3, 2, 2, 1, 1], [6, 6, 6, 6, 5, 4, 3, 3, 3], 8, 23],
      [[4, 4, 3, 3, 2, 2, 1, 1], [6, 5, 5, 3, 2, 2, 2, 2, 1], 0, 23]
    ],
    rolls: 150
  };

  assert.deepEqual(actual, expected);
});

it('max rounds', () => {
  const options = { maxRounds: 1, rolls: d6rolls };

  const actual = blitz(52, 42, options);

  // console.log(JSON.stringify(actual));

  const expected = {
    startingAttackers: 52,
    startingDefenders: 42,
    lostAttackers: 1,
    lostDefenders: 1,
    remainingAttackers: 51,
    remainingDefenders: 41,
    winner: null,
    rounds: [[[4, 4, 2], [6, 1], 51, 41]],
    rolls: 5
  };

  assert.deepEqual(actual, expected);
});
