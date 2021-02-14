/**
 * Performs a blitz
 * @param {number} startingAttackers - The number of attackers to start with
 * @param {number} startingDefenders - The number of defenders to start with
 * @param {Object} options={} - Optional parameters
 * @param {number} options.maxAttackDice=3 - Maximum number of attacker dice rolled during a round
 * @param {number} options.maxDefendDice=2 - Maximum number of defender dice rolled during a round
 * @param {number} options.diceSides=6 - Number of sides per die
 * @param {number} options.stopLoss=0 - Stop when the number of attackers has reached this number
 * @returns {Object}
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
