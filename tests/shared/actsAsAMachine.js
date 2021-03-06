import { expect } from 'chai';
import sinon from 'sinon';

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

export default function actsAsAMachine({ createMachine }) {
  it('creates a machine with an initial state', function () {
    const machine = createMachine(params);
    expect(machine.getState()).to.eql({
      value: 'init',
      context: {result: 10, error: undefined}
    });
  });

  describe('machine.update', function () {
    it('updates the machine by merging the changes into context', function () {
      const machine = createMachine(params);
      
      let updatedState = machine.update("loading");
      expect(updatedState.value).to.eql('loading');
      expect(updatedState.context).to.eql({result: 10, error: undefined});

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

    it('invokes onUpdate if provided', function () {
      const onUpdate = sinon.spy();
      const options = { onUpdate };
      const machine = createMachine(params, options);
      const changes = {result: 200};

      machine.update("success", () => changes);
      expect(machine.getState()).to.eql({
        value: 'success',
        context: {...changes, error: undefined}
      });

      const fistCallArgs = onUpdate.args[0];

      expect(fistCallArgs[0]).to.eql({ result: 200, error: undefined });
      expect(fistCallArgs[1]).to.eql({ state: { prev: 'init', value: 'success' } });
    });

    it('throws an error if state name is invalid', function () {
      const machine = createMachine(params);
      const prevState = machine.getState();
      const update = () => machine.update("fooState");

      expect(update).to.throw();

      const newState = machine.getState();
      expect(prevState).to.eql(newState);
    })
  });

  describe('machine.isValidState()', function () {
    it('returns if the state name is valid', function () {
      const machine = createMachine(params);

      expect(machine.isValidState("loading")).to.equal(true);
      expect(machine.isValidState("foo")).to.equal(false);
    });
  });

  describe('machine.is()', function () {
    it('returns the current state', function () {
      const machine = createMachine(params);
      expect(machine.is("init")).to.equal(true);
      
      machine.update("loading");
  
      expect(machine.is("loading")).to.equal(true);
    });
  });

  describe('machine.context', function () {
    it('returns the current context', function () {
      const machine = createMachine(params);
      expect(machine.context).to.eql({result: 10, error: undefined});

      machine.update("success", () => ({result: 200}));
      expect(machine.context).to.eql({result: 200, error: undefined});
    });

    it('cannot be set with the assignment operator', function () {
      const machine = createMachine(params);
      const setContext = () => machine.context = {result: 'foo'};

      expect(setContext).to.throw();
    });
  });
}