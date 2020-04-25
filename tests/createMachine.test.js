import createMachine from '../createMachine';

let machine = createMachine({
  context: {result: 10, error: undefined},
  initial: 'init',
  states: {
  	init: {},
    loading: {},
    success: {},
    error: {},
  }
}, {
  onUpdate: [
    (ctx, event) => console.log('onUpdate event', event)
  ]
});

console.clear();
machine.update(machine.states.loading);
debug(machine);
console.log('')
machine.update(machine.states.error, ctx => ({error: 'Error! 401'}));
debug(machine);
console.log('')
machine.update(machine.states.loading, ctx => ({error: 'Error! 401'}));
debug(machine);
console.log('')
machine.update(machine.states.success, ctx => ({result: 200}));
debug(machine);
console.log('')
