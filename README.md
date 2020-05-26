lean-state-machine
---

A minimal non-directional state machine, inspired by [xstate](https://github.com/davidkpiano/xstate).

- [x] Transition from any state to any other.
- [x] Minimal footprint - 1/2kb gzipped.
- [x] Extensible via plugins
- [x] Individual files
- [x] Same interface as xstate
- [x] Zero dependencies

Consider this project as xstate on a low carb, low fat, low protein diet. You only have your essential vitamins and minerals - take some data, associate it with a state. You can extend this state machine with your own features by writing plugins.

```
yarn add lean-state-machine
# OR
npm install lean-state-machine
```

### Usage

```js
import createMachine from '../src/createMachine';

const params = {
  context: {result: 10, error: undefined},
  initial: 'init',
  states: {
  	init: {},
    loading: {},
    success: {},
    error: {},
  }
};

const machine = createMachine(params);
machine.getState();
/*
{
  value: 'init',
  context: {result: 10, error: undefined}
}
*/
machine.context
/* {result: 10, error: undefined} */

newState = machine.update("loading");
newState.value;
/* loading */
newState.context;
/* {result: 10, error: undefined} */

newState = machine.update("success", (context) => ({result: 200}));
newState.value
/* success */
newState.context;
/* {result: 200, error: undefined} */

```

---

### Why
Xstate is great. And I learnt a lot by studying its documentation. On my projects, I realized I didnt necessarily need the strict enforcement from one state to another specific state. For example.
In xstate, you need to define all the possible transitions beforehand. Lets say `loading, success, error` are states of my system. I would usually define `loading->success` and `loading->failure`. But sometimes, i just want to jump from `success->failure` without having to go throughh `loading`. Its tedious to have to define all the possible state transitions from one state to another. If you need a strict rule, use xstate. If not, this library works just as well for a minimal use case - data associated with a state.
Many front end projects already use a different state management tool like redux/mobs etc. This library gives you the most bang for your buck in terms of being a state machine.

You can pretty much write a plugin to make this library work just like xstate, but at that point, you should probably just use xstate.

### Plugins
Docs Coming soon. In the meanwhile, look at src/createExposedMachine.

### LICENSE
MIT