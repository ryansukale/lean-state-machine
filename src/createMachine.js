import toArray from "./lib/toArray";

function createMachine(
  { context: initialContext = {}, initial: initialState, states },
  { onUpdate } = {}
) {
  let context = { ...initialContext };
  let state = initialState;
  let prevName = undefined;

  const isValidState = (stateName) => {
    if (!states.hasOwnProperty(stateName)) {
      return false;
    }
    return true;
  };

  const update = (nextName, updater) => {
    if (!isValidState(nextName)) {
      throw new Error(`Unknown state name ${nextName}`);
    }
    prevName = state;
    state = nextName;
    context = !updater ? context : { ...context, ...updater(context) };

    const fns = toArray(onUpdate);
    fns.forEach((fn) =>
      fn(context, { state: { prev: prevName, value: state } })
    );
    return machine.getState();
  };

  const machine = {
    isValidState,
    getState: () => ({ value: state, context: context }),
    is: (s) => state === s,
    update,
    get context() {
      return context;
    },
  };

  return machine;
}

export default createMachine;
