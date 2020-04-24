function createMachine({
  context: initialContext,
  state: initialState,
  states
}, { onUpdate }) {
  let context = {...initialContext};
  let state = initialState;

  const isValidState = (stateName) => {
    if (!states.hasOwnProperty(stateName)) {
      return false;
      console && console.warn(`Unknown state ${stateName}`);
    }
    return true;
  };

  const getState = () => state;
  const getContext = () => context;
  const is = s => state === s;

  const setContext = (ctx) => {
    context = ctx;
    return context;
  }
  const updateContext = (ctx) => {
    context = {...context, ...ctx};
    return context;
  }
  const update = (nextState, updater) => {
    if(!isValidState(nextState)) {
      return false;
    }
    const prevState = state;
    state = nextState;
    updater && updateContext(updater(context));

    onUpdate && onUpdate.forEach(fn => fn(
      context,
      {state : {prev: prevState, current: state}}
    ));
    return context;
  }

  const machine = {
    states: Object.keys(states).reduce((acc, curr) => {
      acc[curr] = curr;
      return acc;
    }, {}),
    isValidState,
    getState,
    getContext,
    setContext,
    updateContext,
    update,
    is
  };

  Object.entries(initialContext).forEach(([key]) => {
    Object.defineProperty(machine, key, {
      // Only allow directly reading context attributes
      get() { return context[key]; }
    })
  });

  return machine;
}

export default createMachine;