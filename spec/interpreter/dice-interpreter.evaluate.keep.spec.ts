import * as Ast from '../../src/ast';
import * as Interpreter from '../../src/interpreter';
import { MockListRandomProvider } from '../helpers';

describe('DiceInterpreter', () => {
  describe('evaluate', () => {
    it('evaluates keep modifier (5d20kh2).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Keep)
        .setAttribute('type', 'highest');

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);
      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 18, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      interpreter.evaluate(exp, errors);

      expect(dice.getChildCount()).toBe(5);
      expect(dice.getChild(0).getAttribute('drop')).toBe(true);
      expect(dice.getChild(1).getAttribute('drop')).toBe(true);
      expect(dice.getChild(2).getAttribute('drop')).toBe(false);
      expect(dice.getChild(3).getAttribute('drop')).toBe(false);
      expect(dice.getChild(4).getAttribute('drop')).toBe(true);
    });
    it('evaluates keep modifier (5d20kh).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Keep)
        .setAttribute('type', 'highest');

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 18, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      interpreter.evaluate(exp, errors);

      expect(dice.getChildCount()).toBe(5);
      expect(dice.getChild(0).getAttribute('drop')).toBe(true);
      expect(dice.getChild(1).getAttribute('drop')).toBe(true);
      expect(dice.getChild(2).getAttribute('drop')).toBe(true);
      expect(dice.getChild(3).getAttribute('drop')).toBe(false);
      expect(dice.getChild(4).getAttribute('drop')).toBe(true);
    });
    it('evaluates keep modifier (5d20kl2).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Keep)
        .setAttribute('type', 'lowest');

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);
      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 18, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      interpreter.evaluate(exp, errors);

      expect(dice.getChildCount()).toBe(5);
      expect(dice.getChild(0).getAttribute('drop')).toBe(false);
      expect(dice.getChild(1).getAttribute('drop')).toBe(false);
      expect(dice.getChild(2).getAttribute('drop')).toBe(true);
      expect(dice.getChild(3).getAttribute('drop')).toBe(true);
      expect(dice.getChild(4).getAttribute('drop')).toBe(true);
    });
    it('evaluates keep modifier (5d20kl).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Keep)
          .setAttribute('type', 'lowest');

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 18, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      interpreter.evaluate(exp, errors);

      expect(dice.getChildCount()).toBe(5);
      expect(dice.getChild(0).getAttribute('drop')).toBe(false);
      expect(dice.getChild(1).getAttribute('drop')).toBe(true);
      expect(dice.getChild(2).getAttribute('drop')).toBe(true);
      expect(dice.getChild(3).getAttribute('drop')).toBe(true);
      expect(dice.getChild(4).getAttribute('drop')).toBe(true);
    });
    it('evaluates keep modifier (3d6km).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Keep)
          .setAttribute('type', 'middle');

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 3));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 6));

      exp.addChild(dice);

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(1, 3, 5);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      interpreter.evaluate(exp, errors);

      expect(exp.getAttribute('value')).toBe(3);
      expect(dice.getAttribute('value')).toBe(9);

      expect(dice.getChildCount()).toBe(3);
      expect(dice.getChild(0).getAttribute('drop')).toBe(true);
      expect(dice.getChild(1).getAttribute('drop')).toBe(false);
      expect(dice.getChild(2).getAttribute('drop')).toBe(true);
    });
    it('evaluates keep modifier (5d20km2).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Keep)
          .setAttribute('type', 'middle');

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      exp.addChild(dice);
      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(8, 12, 18, 20, 14);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const errors: Interpreter.InterpreterError[] = [];
      interpreter.evaluate(exp, errors);

      expect(exp.getAttribute('value')).toBe(44);
      expect(dice.getAttribute('value')).toBe(72);

      expect(dice.getChildCount()).toBe(5);
      expect(dice.getChild(0).getAttribute('drop')).toBe(true);
      expect(dice.getChild(1).getAttribute('drop')).toBe(false);
      expect(dice.getChild(2).getAttribute('drop')).toBe(false);
      expect(dice.getChild(3).getAttribute('drop')).toBe(true);
      expect(dice.getChild(4).getAttribute('drop')).toBe(false);
    });
  });
});
