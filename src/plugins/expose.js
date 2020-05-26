export default function expose(params, _options, machine) {
  Object.entries(params.context).forEach(([key]) => {
    Object.defineProperty(machine, key, {
      // Only allow directly reading context attributes
      get() {
        return machine.context[key];
      },
    });
  });

  return machine;
}
