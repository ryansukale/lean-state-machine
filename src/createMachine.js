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
      console && console.warn(`Unknown state ${stateName}`);
      return false;
    }
    return true;
  };

  const update = (nextName, updater) => {
    if (!isValidState(nextName)) {
      return false;
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

  // Object.defineProperty(machine, 'context', {
  //   get() { // Only allow read
  //     return context;
  //   },
  // });

  // Object.entries(initialContext).forEach(([key]) => {
  //   Object.defineProperty(machine, key, {
  //     // Only allow directly reading context attributes
  //     get() {
  //       return context[key];
  //     },
  //   });
  // });

  return machine;
}

export default createMachine;
