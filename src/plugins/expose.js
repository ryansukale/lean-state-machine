export default function expose(params, _options, machine) {
  const finalMachine = {
    ...machine,
  };

  Object.entries(params.context).forEach(([key]) => {
    Object.defineProperty(finalMachine, key, {
      // Only allow directly reading context attributes
      get() {
        return machine.getContext()[key];
      },
    });
  });

  return finalMachine;
}
