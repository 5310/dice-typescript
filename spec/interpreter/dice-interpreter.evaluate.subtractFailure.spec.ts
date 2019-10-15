import * as Ast from '../../src/ast';
import * as Interpreter from '../../src/interpreter';
import { MockListRandomProvider } from '../helpers';

describe('DiceInterpreter', () => {
  describe('evaluate', () => {
    it('evaluates subtractFailure dice (4d6=6f).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.SubtractFailure)
        .setAttribute('subtractFailure', true);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 4));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 6));

      const equal = Ast.Factory.create(Ast.NodeType.Equal);
      equal.addChild(dice);
      equal.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 6));

      exp.addChild(equal);

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(
        1, 6, 6, 2,
      );

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      expect(interpreter.evaluate(exp, errors)).toBe(15);

      expect(dice.getChildCount()).toBe(4);
      expect(dice.getChild(0).getAttribute('failure')).toBe(true);
      expect(dice.getChild(0).getAttribute('success')).toBe(false);
      expect(dice.getChild(1).getAttribute('success')).toBe(true);
      expect(dice.getChild(2).getAttribute('success')).toBe(true);
      expect(dice.getChild(3).getAttribute('success')).toBe(false);
    });
    it('evaluates subtractFailure dice with condition (4d6=6f3).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.SubtractFailure)
          .setAttribute('subtractFailure', true);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 4));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 6));

      const equal = Ast.Factory.create(Ast.NodeType.Equal);
      equal.addChild(dice);
      equal.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 6));

      exp.addChild(equal);

      const number = Ast.Factory.create(Ast.NodeType.Number);
      number.setAttribute('value', 3);
      exp.addChild(number);

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(
          2, 6, 6, 3,
      );

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      expect(interpreter.evaluate(exp, errors)).toBe(17);

      expect(dice.getChildCount()).toBe(4);
      expect(dice.getChild(0).getAttribute('success')).toBe(false);
      expect(dice.getChild(1).getAttribute('success')).toBe(true);
      expect(dice.getChild(2).getAttribute('success')).toBe(true);
      expect(dice.getChild(3).getAttribute('success')).toBe(false);
      expect(dice.getChild(3).getAttribute('failure')).toBe(true);
    });
  });
});
