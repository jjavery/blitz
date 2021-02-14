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

{{>main}}

---

Copyright &copy; 2021 James P. Javery [@jjavery](https://github.com/jjavery)
