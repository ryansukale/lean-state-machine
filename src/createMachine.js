function createProxy({
  initialContext,
  initialState,
  states
}) {
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

  const setState = stateName => {
    state = isValidState(stateName) ? stateName : state;
  };
  const setContext = (ctx) => {
    context = ctx;
    return context;
  }
  const updateContext = (ctx) => {
    context = {...context, ...ctx};
    return context;
  }
  const update = (stateName, updater) => {
    if(!isValidState(stateName)) {
      return false;
    }
    state = stateName;
    updater && updateContext(updater(context));
    return context;
  }

  const proxy = {
    setState,
    getState,
    getContext,
    setContext,
    updateContext,
    update
  };

  Object.entries(initialContext).forEach(([key]) => {
    Object.defineProperty(proxy, key, {
      // Only allow directly reading context attributes
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
  });
}

let machine = createMachine({
  context: {result: 10, error: undefined},
  initial: 'init',
  states: {
  	init:{},
    loading: {},
    success: {},
    error: {},
  }
});

function debug(machine) {
  console.log(`{result, error, state}`);
  // console.log(`{${JSON.stringify(machine.getContext(), null, 2)}, ${machine.getState()}}`);
  console.log(`{${machine.result}, ${machine.error}, ${machine.getState()}}`);
}

console.clear();
// machine.setState("success");
debug(machine);
console.log('');
machine.updateContext({error: 'Oh no!'});
machine.setState("error");
debug(machine);
console.log('')
machine.result = 20;
debug(machine);
console.log('')
machine.update("success", ctx => ({result: 200}));
debug(machine);