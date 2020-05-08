import createMachine from '../src/createMachine';
import { expect } from 'chai';

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

const options = {
  onUpdate: [
    (ctx, event) => console.log('onUpdate event', event)
  ]
};

describe('createMachine', function () {
  it('creates a machine with an initial state', function () {
    const machine = createMachine(params, options);
    expect(machine.getState()).to.eql({
      value: 'init',
      context: {result: 10, error: undefined}
    });
  });
});

// let machine = createMachine(params, options);

// console.clear();
// machine.update(machine.states.loading);
// debug(machine);
// console.log('')
// machine.update(machine.states.error, ctx => ({error: 'Error! 401'}));
// debug(machine);
// console.log('')
// machine.update(machine.states.loading, ctx => ({error: 'Error! 401'}));
// debug(machine);
// console.log('')
// machine.update(machine.states.success, ctx => ({result: 200}));
// debug(machine);
// console.log('')
