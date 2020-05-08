import createMachine from '../src/createMachine';
import actsAsAMachine from './shared/actsAsAMachine';

describe('createMachine', function () {
  actsAsAMachine({createMachine});
});