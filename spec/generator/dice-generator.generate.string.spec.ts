import * as Ast from '../../src/ast';
import * as Generator from '../../src/generator';
import { MockRandomProvider } from '../helpers';

describe('DiceGenerator', () => {
  describe('generate', () => {
    it('correctly evaluates a string.', () => {
      const func = Ast.Factory.create(Ast.NodeType.String).setAttribute('value', 'test string');

      const generator = new Generator.DiceGenerator();

      const res = generator.generate(func);
      expect(res).toBe('"test string"');
    });
  });
});
