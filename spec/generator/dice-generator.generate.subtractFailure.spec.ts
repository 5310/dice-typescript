import * as Ast from '../../src/ast';
import * as Generator from '../../src/generator';

describe('DiceGenerator', () => {
  describe('generate', () => {
    it('generates the default subtractFailure (2d6f).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.SubtractFailure)
        .setAttribute('subtractFailure', false);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));
      dice.addChild(Ast.Factory.create(Ast.NodeType.DiceSides).setAttribute('value', 6));

      exp.addChild(dice);

      const generator = new Generator.DiceGenerator();
      expect(generator.generate(exp)).toBe('2d6f');
    });
    it('generates a subtractFailure with shortcut (2d6f2).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.SubtractFailure)
        .setAttribute('subtractFailure', true);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));
      dice.addChild(Ast.Factory.create(Ast.NodeType.DiceSides).setAttribute('value', 6));
      exp.addChild(dice);

      const number = Ast.Factory.create(Ast.NodeType.Number);
      number.setAttribute('value', 2);
      exp.addChild(number);

      const generator = new Generator.DiceGenerator();
      expect(generator.generate(exp)).toBe('2d6f2');
    });
    it('generates a subtractFailure with a condition (2d6r<3).', () => {
      const exp = Ast.Factory.create(Ast.NodeType.SubtractFailure)
        .setAttribute('subtractFailure', false);

      const dice = Ast.Factory.create(Ast.NodeType.Dice);
      dice.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 2));
      dice.addChild(Ast.Factory.create(Ast.NodeType.DiceSides).setAttribute('value', 6));
      exp.addChild(dice);

      const less = Ast.Factory.create(Ast.NodeType.Less);
      less.addChild(Ast.Factory.create(Ast.NodeType.Number).setAttribute('value', 3));
      exp.addChild(less);

      const generator = new Generator.DiceGenerator();
      expect(generator.generate(exp)).toBe('2d6f<3');
    });
  });
});
