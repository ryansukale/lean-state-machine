import createMachine from "./createMachine";
import toArray from "./lib/toArray";

function createTransitionMachine(params, options) {
  const machine = createMachine(params, options);

  const update = (nextState, updater) => {
    if (!machine.isValidState(nextState)) {
      return false;
    }

    const state = machine.getState();
    const currentOn = params.states[state].on;
    const nextOn = params.states[nextState].on;
    let event;

    if (currentOn || nextOn) {
      event = { transition: [state, nextState] };
    }

    if (currentOn && currentOn.exit) {
      const fns = toArray(currentOn.exit);
      fns.forEach((f) => f(machine.getContext(), event));
    }

    const context = machine.update(nextState, updater);

    if (nextOn && nextOn.entry) {
      const fns = toArray(nextOn.entry);
      fns.forEach((f) => f(context, event));
    }

    return context;
  };

  return { ...machine, update };
}

export default createTransitionMachine;