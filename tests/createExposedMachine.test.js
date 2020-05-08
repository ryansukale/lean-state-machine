import { expect } from 'chai';

import createExposedMachine from '../src/createExposedMachine';
import actsAsAMachine from './shared/actsAsAMachine';

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

describe('createExposedMachine', function () {
  it('has getters for the context attributes', function () {
    const machine = createExposedMachine(params);
    machine.update("error", () => ({ error: 401 }))
    expect(machine.result).to.equal(10);
    expect(machine.error).to.equal(401);
  });

  actsAsAMachine({createMachine: createExposedMachine})
});