require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"blitz":[function(require,module,exports){
/**
 * Performs a blitz
 * @param {number} startingAttackers - The number of attackers to start with
 * @param {number} startingDefenders - The number of defenders to start with
 * @param {Object} options={} - Optional parameters
 * @param {number} options.maxAttackDice=3 - Maximum number of attacker dice rolled during a round
 * @param {number} options.maxDefendDice=2 - Maximum number of defender dice rolled during a round
 * @param {number} options.diceSides=6 - Number of sides per die
 * @param {number} options.stopLoss=0 - Stop when the number of attackers has reached this number
 * @param {number} options.maxRounds=Number.MAX_SAFE_INTEGER - Maximum number of rounds to perform
 * @param {Array} options.rolls - Integer array to use for dice rolls instead of Math.random()
 * @returns {BlitzResult}
 */
function blitz(
  startingAttackers,
  startingDefenders,
  {
    maxAttackDice = 3,
    maxDefendDice = 2,
    diceSides = 6,
    stopLoss = 0,
    maxRounds = Number.MAX_SAFE_INTEGER,
    rolls
  } = {}
) {
  let remainingAttackers = startingAttackers;
  let remainingDefenders = startingDefenders;

  const rounds = [];
  let rollCount = 0;

  function roll(numberOfDice) {
    const result = [];
    for (let i = 0; i < numberOfDice; ++i) {
      if (rolls == null) {
        result[i] = Math.floor(Math.random() * diceSides) + 1;
      } else {
        result[i] = rolls[rollCount % rolls.length];
      }
      ++rollCount;
    }
    return result.sort((a, b) => b - a);
  }

  function battle(attackRoll, defendRoll) {
    for (let i = 0; i < defendRoll.length && i < attackRoll.length; ++i) {
      if (attackRoll[i] > defendRoll[i]) {
        --remainingDefenders;
      } else {
        --remainingAttackers;
      }
    }
  }

  while (
    remainingAttackers > stopLoss &&
    remainingDefenders > 0 &&
    rounds.length < maxRounds
  ) {
    const numberOfAttackerDice = Math.min(
      maxAttackDice,
      remainingAttackers - stopLoss
    );
    const numberOfDefenderDice = Math.min(maxDefendDice, remainingDefenders);

    const attackRoll = roll(numberOfAttackerDice);
    const defendRoll = roll(numberOfDefenderDice);

    battle(attackRoll, defendRoll);

    rounds.push([
      attackRoll,
      defendRoll,
      remainingAttackers,
      remainingDefenders
    ]);
  }

  /**
   * @typedef {Object} BlitzResult
   * @property {number} startingAttackers - The number of attackers at start
   * @property {number} startingDefenders - The number of defenders at start
   * @property {number} lostAttackers - The number of attackers lost
   * @property {number} lostDefenders - The number of defenders lost
   * @property {number} remainingAttackers - The number of attackers remaining
   * @property {number} remainingDefenders - The number of defenders remaining
   * @property {string} winner - `attacker` or `defender` or null
   * @property {Array} rounds - The accumulated rounds completed
   * @property {number} rolls - The number of times a die was rolled
   */
  return {
    startingAttackers,
    startingDefenders,
    lostAttackers: startingAttackers - remainingAttackers,
    lostDefenders: startingDefenders - remainingDefenders,
    remainingAttackers,
    remainingDefenders,
    winner:
      remainingDefenders === 0
        ? 'attacker'
        : remainingAttackers === 0
        ? 'defender'
        : null,
    rounds,
    rolls: rollCount
  };
}

module.exports = blitz;

},{}]},{},[]);
