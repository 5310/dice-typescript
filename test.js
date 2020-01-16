const { Dice } = require("./dist");

const dice = new Dice(null, null, {renderExpressionDecorators: true});
const roll = dice.roll("{10d10cs...5}>=8");
console.log(roll.renderedExpression);
console.log(roll.reducedExpression);
console.log(roll.successes);
console.log(roll.failures);
