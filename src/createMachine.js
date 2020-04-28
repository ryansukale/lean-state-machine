import toArray from "./lib/toArray";

function createMachine(
  { context: initialContext = {}, initial: initialState, states },
  { onUpdate }
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

  const getState = () => state;
  const getContext = () => context;
  const is = (s) => state === s;
  const was = (s) => prevState === s;

  const setContext = (ctx) => {
    context = ctx;
    return context;
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
    getState,
    getContext,
    setContext,
    update,
    is,
    was,
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
