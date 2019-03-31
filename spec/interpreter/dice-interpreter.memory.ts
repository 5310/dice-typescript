import * as Interpreter from '../../src/interpreter';

describe('DiceInterpreter', () => {
  describe('interpret', () => {
    it('store something.', () => {
      const interpreter = new Interpreter.DiceInterpreter(null);
      interpreter.setMemory('key', 'value');

      expect(interpreter.getMemory('key')).toBe('value');
    });
  });
});
