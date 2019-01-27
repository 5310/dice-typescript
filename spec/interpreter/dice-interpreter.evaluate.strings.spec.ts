import * as Ast from '../../src/ast';
import * as Interpreter from '../../src/interpreter';

describe('DiceInterpreter', () => {
  describe('evaluate', () => {
    it('correctly evaluates a string.', () => {
      const string = Ast.Factory.create(Ast.NodeType.String).setAttribute('value', 'test string');

      const interpreter = new Interpreter.DiceInterpreter();
      const errors: Interpreter.InterpreterError[] = [];
      const res = interpreter.evaluate(string, errors);
      expect(res).toBe('test string');
    });
  });
});
