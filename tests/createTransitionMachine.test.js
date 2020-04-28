var chai = require('chai');
var expect = chai.expect;
var ROOT = '../';

// var createTransitionMachine = require(ROOT + '/src/createTransitionMachine');
import createTransitionMachine from '../src/createTransitionMachine';

describe.only('createTransitionMachine', function () {
  it('returns a machine with transition properties', function () {
    const params = {
      context: {result: 10, error: undefined},
      initial: 'init',
      states: {
        init: {},
        loading: {
          on: {
            exit: (x,y) => console.log('on:exiting loading', y)
          }
        },
        success: {
          on: {
            entry: (x, y) => console.log('on:entering success', y)
          }
        },
        error: {},
      }
    };

    var options = {
      onUpdate: (_ctx, event) => console.log('onUpdate event', event)
    };

    var machine = createTransitionMachine(params, options);
    machine.update(machine.states.loading);
    machine.update(machine.states.success);
  });
});