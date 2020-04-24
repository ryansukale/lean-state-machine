function createMachineProxy(initialContext, states) {
  const context = {...initialContext};
  const proxy = {};

  Object.entries(obj).forEach(([key]) => {
    Object.defineProperty(proxy, key, {
      set(next) {
        context[key] = next;
      },
      get() { return context[key]; }
    })
  });

  return proxy;
}

function createMachine(context, states) {

}