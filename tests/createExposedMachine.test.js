import createExposedMachine from '../src/createExposedMachine';
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

describe('createExposedMachine', function () {
  it('has getters for the context attributes', function () {
    const machine = createExposedMachine(params, options);
    machine.update("error", () => ({ error: 401 }))
    expect(machine.result).to.equal(10);
    expect(machine.error).to.equal(401);
  });

  it('creates a machine with an initial state', function () {
    const machine = createExposedMachine(params, options);
    expect(machine.getState()).to.eql({
      value: 'init',
      context: {result: 10, error: undefined}
    });
  });

  describe('machine.update', function () {
    it('updates the machine', function () {
      const machine = createExposedMachine(params, options);
      
      let updatedState = machine.update("loading");
      expect(machine.getState()).to.eql({
        value: 'loading',
        context: {result: 10, error: undefined}
      });
      expect(updatedState).to.eql(machine.getState());
  
      updatedState = machine.update("success", () => ({result: 200}));
      expect(machine.getState()).to.eql({
        value: 'success',
        context: {result: 200, error: undefined}
      });
      expect(updatedState).to.eql(machine.getState());
    });

    it('does not update if the state name is invalid', function () {
      const machine = createExposedMachine(params, options);
      const prevState = machine.getState();

      machine.update("fooState");

      const newState = machine.getState();
      expect(prevState).to.eql(newState);
    })
  });

  describe('machine.isValidState()', function () {
    it('returns if the state name is valid', function () {
      const machine = createExposedMachine(params, options);

      expect(machine.isValidState("loading")).to.equal(true);
      expect(machine.isValidState("unknown")).to.equal(false);
    });
  });

  describe('machine.is()', function () {
    it('returns the current state', function () {
      const machine = createExposedMachine(params, options);
      expect(machine.is("init")).to.equal(true);
      
      machine.update("loading");
  
      expect(machine.is("loading")).to.equal(true);
    });
  });

  describe('machine.context', function () {
    it('returns the current context', function () {
      const machine = createExposedMachine(params, options);
      expect(machine.context).to.eql({result: 10, error: undefined});

      machine.update("success", () => ({result: 200}));
      expect(machine.context).to.eql({result: 200, error: undefined});
    });

    it('cannot be set with the assignment operator', function () {
      const machine = createExposedMachine(params, options);
      const setContext = () => machine.context = {result: 'foo'};

      expect(setContext).to.throw();
    });
  });
});