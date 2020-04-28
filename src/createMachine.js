import toArray from "./lib/toArray";

function createMachine(
  { context: initialContext = {}, initial: initialState, states },
  { onUpdate } = {}
) {
  let context = { ...initialContext };
  let state = initialState;
  let prevState = undefined;

  const isValidState = (stateName) => {
    if (!states.hasOwnProperty(stateName)) {
      return false;
      console && console.warn(`Unknown state ${stateName}`);
    }
    return true;
  };

  const update = (nextState, updater) => {
    if (!isValidState(nextState)) {
      return false;
    }
    prevState = state;
    state = nextState;
    context = !updater ? context : { ...context, ...updater(context) };

    const fns = toArray(onUpdate);
    fns.forEach((fn) =>
      fn(context, { state: { prev: prevState, current: state } })
    );
    return context;
  };

  const machine = {
    states: Object.keys(states).reduce((acc, curr) => {
      acc[curr] = curr;
      return acc;
    }, {}),
    isValidState,
    getState: () => state,
    getContext: () => context,
    is: (s) => state === s,
    was: (s) => prevState === s,
    update,
  };

  Object.entries(initialContext).forEach(([key]) => {
    Object.defineProperty(machine, key, {
      // Only allow directly reading context attributes
      get() {
        return context[key];
      },
    });
  });

  return machine;
}

export default createMachine;
