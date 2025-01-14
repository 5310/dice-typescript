import * as Ast from '../../src/ast';
import * as Interpreter from '../../src/interpreter';
import { MockListRandomProvider } from '../helpers';

describe('DiceInterpreter', () => {
  describe('interpret', () => {
    it('interprets a complex dice expression (2d20kl>14).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.Greater);

      const keep = Ast.Factory.create(Ast.NodeType.Keep);
      keep.setAttribute('type', 'lowest');

      exp.addChild(keep);
      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 14));

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));

      keep.addChild(dice);

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(20, 15);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const res = interpreter.interpret(exp);

      expect(res.errors.length).toBe(0, 'Unexpected errors found.');
      expect(res.successes).toBe(1, 'Successes counted incorrectly');
      expect(res.failures).toBe(0, 'Failures counted incorrectly');
      expect(res.total).toBe(res.successes, 'Total counted incorrectly');
      expect(res.renderedExpression).toBe('[20, 15]kl > 14 | Difficulty: > 14', 'Expression rendered incorrectly.');
    });
    it('interprets a complex dice expression {2d20kl..5}>=14).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.GreaterOrEqual);

      const group = Ast.Factory.create(Ast.NodeType.Group);
      exp.addChild(group);

      const repeat = Ast.Factory.create(Ast.NodeType.Repeat);
      group.addChild(repeat);

      const keep = Ast.Factory.create(Ast.NodeType.Keep);
      keep.setAttribute('type', 'lowest');
      repeat.addChild(keep);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 20));
      keep.addChild(dice);

      repeat.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 5));

      exp.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 14));

      const mockList = new MockListRandomProvider();
      mockList.numbers.push(20, 15, 14, 10, 18, 14, 2, 13, 18, 10);

      const interpreter = new Interpreter.DiceInterpreter(null, mockList);
      const res = interpreter.interpret(exp);

      expect(res.errors.length).toBe(0, 'Unexpected errors found.');
      expect(res.successes).toBe(2, 'Successes counted incorrectly');
      expect(res.failures).toBe(3, 'Failures counted incorrectly');
      expect(res.total).toBe(res.successes, 'Total counted incorrectly');
      expect(res.renderedExpression).toBe(
        '{[20, 15]kl = 15; [14, 10]kl = 10; [18, 14]kl = 14; [2, 13]kl = 2; [18, 10]kl = 10} >= 14 | Difficulty: >= 14',
        'Expression rendered incorrectly.'
      );
    });
  });
});
