import createMachine from './createMachine';

function createTransitionMachine(params, options) {
  const machine = createMachine(params, options);
  
  const update = (nextState, updater) => {
    if(!machine.isValidState(nextState)) {
      return false;
    }
    
    const state = machine.getState();
    const currentOn = params.states[state].on;
    const nextOn = params.states[nextState].on;
    let event;

    if (currentOn || nextOn) {
      event = { transition : [state, nextState] };
    }

    if (currentOn && currentOn.exit) {
      currentOn.exit.forEach(
        fn => fn(
          machine.getContext(),
          event
        )
      )
    }

    const context = machine.update(nextState, updater);

    if (nextOn && nextOn.entry) {
      nextOn.entry.forEach(
        fn => fn(
          context,
          event
        )
      )
    }

    return context;
  }

  return {
    ...machine,
    update
  }
}

export default createTransitionMachine;