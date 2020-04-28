import createMachine from "../createMachine";

const enhance = (...plugins) => (params, options) => {
  let baseMachine = createMachine(params, options);
  return plugins.reduceRight(
    (machine, plugin) => plugin(params, options, machine),
    baseMachine
  );
};

export default enhance;
