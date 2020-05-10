import createMachine from "./createMachine";

export default (...plugins) => (params, options) => {
  let baseMachine = createMachine(params, options);
  return plugins.reduceRight(
    (machine, plugin) => plugin(params, options, machine),
    baseMachine
  );
};
