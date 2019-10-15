import { NodeType } from '../../src/ast/node-type.enum';
import { Token, TokenType } from '../../src/lexer';
import * as Parser from '../../src/parser';
import { ParseResult } from '../../src/parser/parse-result.class';
import { MockLexer } from '../helpers';

describe('DiceParser', () => {
  describe('subtractFailure', () => {
    it('can correctly parse a failure modifier (f).', () => {
      const lexer = new MockLexer([
        new Token(TokenType.Identifier, 0, 'f')
      ]);
      const parser = new Parser.DiceParser(lexer);
      const result = new ParseResult();
      const mod = parser.parseSubtractFailure(result);
      expect(result.errors.length).toBe(0);
      expect(mod.type).toBe(NodeType.SubtractFailure);
      expect(mod.getAttribute('subtractFailure')).toBe(true);
    });
    it('can correctly parse a failure equal modifier (f2).', () => {
      const lexer = new MockLexer([
        new Token(TokenType.Identifier, 0, 'f'),
        new Token(TokenType.Number, 1, '2')
      ]);
      const parser = new Parser.DiceParser(lexer);
      const result = new ParseResult();
      const mod = parser.parseSubtractFailure(result);
      expect(result.errors.length).toBe(0);
      expect(mod.type).toBe(NodeType.SubtractFailure);
      expect(mod.getAttribute('subtractFailure')).toBe(true);
      expect(mod.getChildCount()).toBe(1);
      expect(mod.getChild(0).type).toBe(NodeType.Equal);
    });
    it('can correctly parse a failure comparison modifier (f<=3).', () => {
      const lexer = new MockLexer([
        new Token(TokenType.Identifier, 0, 'f'),
        new Token(TokenType.LessOrEqual, 1, '<='),
        new Token(TokenType.Number, 3, '3')
      ]);
      const parser = new Parser.DiceParser(lexer);
      const result = new ParseResult();
      const mod = parser.parseSubtractFailure(result);
      expect(result.errors.length).toBe(0);
      expect(mod.type).toBe(NodeType.SubtractFailure);
      expect(mod.getAttribute('subtractFailure')).toBe(true);
      expect(mod.getChildCount()).toBe(1);
      expect(mod.getChild(0).type).toBe(NodeType.LessOrEqual);
    });
  });
});
