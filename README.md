# @jjavery/blitz

Sets of dice representing attackers and defenders are rolled one or more times to determine casualties for each side

## Installation

Install with NPM

```shell
$ npm install @jjavery/blitz
```

# API Reference

## blitz(startingAttackers, startingDefenders, options) ⇒ Object
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


---

Copyright &copy; 2021 James P. Javery [@jjavery](https://github.com/jjavery)
