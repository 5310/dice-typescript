import * as Ast from '../../src/ast';
import * as Interpreter from '../../src/interpreter';
import { MockListRandomProvider } from '../helpers';

describe('DiceInterpreter', () => {
  describe('evaluate', () => {
    it('evaluates successes (5d20>10).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Greater);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);
      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 10));

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 6, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      const res = interpreter.evaluate(exp, errors);

      expect(dice.getChildCount()).toBe(5);
      expect(dice.getChild(0).getAttribute('success')).toBe(false);
      expect(dice.getChild(1).getAttribute('success')).toBe(true);
      expect(dice.getChild(2).getAttribute('success')).toBe(false);
      expect(dice.getChild(3).getAttribute('success')).toBe(true);
      expect(dice.getChild(4).getAttribute('success')).toBe(true);
    });

    it('evaluates relational operations with numbers (20>10).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Greater);

      const numberLeft = Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20);
      const numberRight = Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 10);

      exp.addChild(numberLeft);
      exp.addChild(numberRight);

      const interpreter = new Interpreter.DiceInterpreter();
      const errors: Interpreter.InterpreterError[] = [];
      const res = interpreter.evaluate(exp, errors);

      expect(exp.getChildCount()).toBe(2);
      expect(exp.getAttribute('success')).toBe(1);
      expect(res).toBe(1);
    });

    it('evaluates relational operations with negative numbers (20>-10).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Greater);

      const numberLeft = Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20);
      const numberRight = Ast.Factory.create(Ast.NodeType.Negate);
      numberRight.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 10));

      exp.addChild(numberLeft);
      exp.addChild(numberRight);

      const interpreter = new Interpreter.DiceInterpreter();
      const errors: Interpreter.InterpreterError[] = [];
      const res = interpreter.evaluate(exp, errors);

      expect(exp.getChildCount()).toBe(2);
      expect(exp.getAttribute('success')).toBe(1);
      expect(res).toBe(1);
    });


    it('evaluates successes as total for further modification (5d20>10).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Greater);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);
      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 10));

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 6, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      const res = interpreter.evaluate(exp, errors);

      expect(res).toBe(3);
    });
  });
});
