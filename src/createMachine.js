function createProxy({
  initialContext,
  initialState,
  states
}) {
  const context = {...initialContext};
  let state = initialState;

  const proxy = {
    setState: (stateName) => {
      // You can only set a name to one of the predefined states
      state = states[stateName] ? stateName : state;
    },
    getState() {
      return state;
    },
    getContext() {
      return context;
    }
  };

  Object.entries(initialContext).forEach(([key]) => {
    Object.defineProperty(proxy, key, {
      set(nextValue) {
        context[key] = nextValue;
      },
      get() { return context[key]; }
    })
  });

  return proxy;
}

function createMachine({context, initial, states}) {
  return createProxy({
    initialContext: context,
    initialState: initial,
    states
  })
}

let machine = createMachine({
  context: {value: 10, error: undefined},
  initial: 'init',
  states: {
  	init:{},
    loading: {},
    success: {},
    failure: {},
  }
});

function debug(machine) {
  console.log(`{result, error, getState}`);
  console.log(`{${machine.result}, ${machine.error}, ${machine.getState()}}`);
}
machine.setState("loading");
debug(machine);
machine.setState("success");
debug(machine);
machine.error = 'Oh no!'
debug(machine);