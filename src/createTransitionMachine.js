function createProxy(obj, {entry, exit, onChange}) {
  const context = {...obj};
  const proxy = {};

  Object.entries(obj).forEach(([key, value]) => {
    Object.defineProperty(proxy, key, {
      set(next) {
        const prev = context[key];
        if (exit && key === "state") {
          exit(context, {attribute: key, prev, next});
        }

        context[key] = next;
        
        if (entry && key ==="state") {
          entry(context, {attribute: key, prev, next});
        }
      },
      get() { return context[key]; }
    })
  });

  return proxy;
}

function createMachine({
  context,
  state = 'init'
}) {
  const onChange = (ctx, event) => {
    console.log('ctx', ctx);
  };
  return createProxy({...context, state}, {exit: onChange});
}

let machine = createMachine({
  context: {value: 10, error: undefined}
});

machine.value = 5;
// machine.state = 'loading';
machine.error = 'Some error message';
// machine.state = 'error';