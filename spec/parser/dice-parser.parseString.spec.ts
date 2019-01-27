import { NodeType } from '../../src/ast/node-type.enum';
import { Token, TokenType } from '../../src/lexer';
import * as Parser from '../../src/parser';
import { ParseResult } from '../../src/parser/parse-result.class';
import { MockLexer } from '../helpers';

describe('DiceParser', () => {
  describe('parseString', () => {
    it('can correctly parse a simple string', () => {
      const lexer = new MockLexer([
        new Token(TokenType.String, 0, '"test text"'),
      ]);
      const parser = new Parser.DiceParser(lexer);
      const result = new ParseResult();
      const exp = parser.parseString(result);
      expect(result.errors.length).toBe(0);
      expect(exp.type).toBe(NodeType.String);
      expect(exp.getChildCount()).toBe(0);
      expect(exp.getAttribute('value')).toBe('test text');
    });
    it('can correctly parse a complex string', () => {
      const lexer = new MockLexer([
        new Token(TokenType.String, 0, '"@ʟဥʀ㴅🎁乞¾꼆࣡"'),
      ]);
      const parser = new Parser.DiceParser(lexer);
      const result = new ParseResult();
      const exp = parser.parseString(result);
      expect(result.errors.length).toBe(0);
      expect(exp.type).toBe(NodeType.String);
      expect(exp.getChildCount()).toBe(0);
      expect(exp.getAttribute('value')).toBe('@ʟဥʀ㴅🎁乞¾꼆࣡');
    });
  });
});
