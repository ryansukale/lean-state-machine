export default function debug(machine) {
  console.log(`{result, error, state}`);
  // console.log(`{${JSON.stringify(machine.getContext(), null, 2)}, ${machine.getState()}}`);
  console.log(`{${machine.result}, ${machine.error}, ${machine.getState()}}`);
}