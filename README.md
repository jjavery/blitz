# @jjavery/blitz

Sets of dice representing attackers and defenders are rolled one or more times to determine casualties for each side

## Installation

Install with NPM

```shell
$ npm install @jjavery/blitz
```

## Example

### game.js:

```javascript
const blitz = require('@jjavery/blitz');

// Attack with 5, defend with 3
const result = blitz(5, 3);

/*
result will look something like this:

{
  startingAttackers: 5,
  startingDefenders: 4,
  lostAttackers: 5,
  lostDefenders: 1,
  remainingAttackers: 0,
  remainingDefenders: 3,
  winner: 'defender',
  rounds: [
    [[5, 4, 3], [6, 4], 3, 4],
    [[6, 3, 2], [5, 3], 2, 3],
    [[5, 1], [5, 4], 0, 3]
  ],
  rolls: 14
}
*/

```

# API Reference


## blitz(startingAttackers, startingDefenders, options) ⇒ BlitzResult
Performs a blitz


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startingAttackers | number |  | The number of attackers to start with |
| startingDefenders | number |  | The number of defenders to start with |
| options | Object | `{}` | Optional parameters |
| options.maxAttackDice | number | `3` | Maximum number of attacker dice rolled during a round |
| options.maxDefendDice | number | `2` | Maximum number of defender dice rolled during a round |
| options.diceSides | number | `6` | Number of sides per die |
| options.stopLoss | number | `0` | Stop when the number of attackers has reached this number |
| options.maxRounds | number | `Number.MAX_SAFE_INTEGER` | Maximum number of rounds to perform |
| options.rolls | Array |  | Integer array to use for dice rolls instead of Math.random() |

## BlitzResult : Object
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| startingAttackers | number | The number of attackers at start |
| startingDefenders | number | The number of defenders at start |
| lostAttackers | number | The number of attackers lost |
| lostDefenders | number | The number of defenders lost |
| remainingAttackers | number | The number of attackers remaining |
| remainingDefenders | number | The number of defenders remaining |
| winner | string | `attacker` or `defender` or null |
| rounds | Array | The accumulated rounds completed |
| rolls | number | The number of times a die was rolled |


---

Copyright &copy; 2021 James P. Javery [@jjavery](https://github.com/jjavery)
