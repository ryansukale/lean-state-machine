function createProxy({
  initialContext,
  initialState,
  states
}) {
  let context = {...initialContext};
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
    },
    setContext(newContext) {
      context = newContext;
      return context;
    },
    updateContext(newContext) {
      context = {...context, ...newContext};
      return context;
    }
  };

  Object.entries(initialContext).forEach(([key]) => {
    Object.defineProperty(proxy, key, {
      // set(nextValue) {
      //   context[key] = nextValue;
      // },
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
  context: {result: 10, error: undefined},
  initial: 'init',
  states: {
  	init:{},
    loading: {},
    success: {},
    failure: {},
  }
});

function debug(machine) {
  console.log(`{result, error, state}`);
  // console.log(`{${JSON.stringify(machine.getContext(), null, 2)}, ${machine.getState()}}`);
  console.log(`{${machine.result}, ${machine.error}, ${machine.getState()}}`);
}

machine.setState("success");
debug(machine);
machine.updateContext({error: 'Oh no!'});
machine.setState("error");
debug(machine);
console.log('')
machine.result = 20;
debug(machine);