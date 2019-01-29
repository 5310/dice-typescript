import * as Ast from '../ast';
import { Generator } from './generator.interface';
import { Options } from '../options.interface';
export declare class DiceGenerator implements Generator<string> {
    protected options: Options;
    constructor(options?: Options);
    generate(expression: Ast.ExpressionNode): string;
    generateNumber(expression: Ast.ExpressionNode): string;
    generateAdd(expression: Ast.ExpressionNode): string;
    generateSubtract(expression: Ast.ExpressionNode): string;
    generateMultiply(expression: Ast.ExpressionNode): string;
    generateDivide(expression: Ast.ExpressionNode): string;
    generateModulo(expression: Ast.ExpressionNode): string;
    generateExponent(expression: Ast.ExpressionNode): string;
    generateNegate(expression: Ast.ExpressionNode): string;
    generateDice(expression: Ast.ExpressionNode): string;
    generateDiceSides(expression: Ast.ExpressionNode): string;
    generateDiceRoll(expression: Ast.ExpressionNode): string;
    generateFunction(expression: Ast.ExpressionNode): string;
    generateString(expression: Ast.ExpressionNode): string;
    generateGroup(expression: Ast.ExpressionNode): string;
    generateRepeat(expression: Ast.ExpressionNode): string;
    generateEqual(expression: Ast.ExpressionNode): string;
    generateGreater(expression: Ast.ExpressionNode): string;
    generateGreaterOrEqual(expression: Ast.ExpressionNode): string;
    generateLess(expression: Ast.ExpressionNode): string;
    generateLessOrEqual(expression: Ast.ExpressionNode): string;
    generateExplode(expression: Ast.ExpressionNode): string;
    generateKeep(expression: Ast.ExpressionNode): string;
    generateDrop(expression: Ast.ExpressionNode): string;
    generateCritical(expression: Ast.ExpressionNode): string;
    generateReroll(expression: Ast.ExpressionNode): string;
    generateSort(expression: Ast.ExpressionNode): string;
    private generateEqualityExpression;
    private generateCommaList;
    private generateWithParens;
    private expectChildCount;
    private applyDecorator;
}