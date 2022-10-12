const MATHS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => {
    if (b === 0) {
      throw new RangeError("Error");
    }

    return a / b;
  },
  "*": (a, b) => a * b,
};

const OPERATORS_PRIORITY = {
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1,
};

const opPreced = (op) => OPERATORS_PRIORITY[op];

export const isOperator = (char) => Object.keys(OPERATORS_PRIORITY).includes(char);

export const isNumber = (char) =>
  typeof parseFloat(char) === "number" && !Number.isNaN(parseFloat(char));

/**
 * Calculate Revers Polish Notaton
 * @param {Array} rpn - Revers Polish Notaton
 * @returns {Number} Calculated Revers Polish Notaton
 */
function calculateReversePolishNotation(rpn) {
  const LAST_TWO_ITEMS = -2;
  const stack = [];

  rpn.forEach((char) => {
    if (typeof char === "number") {
      stack.push(char);
    }

    if (isOperator(char)) {
      const math = MATHS[char];
      const [a, b] = stack.splice(LAST_TWO_ITEMS);
      const result = math(a, b);

      stack.push(result);
    }
  });

  const result = Number(stack.pop()).toPrecision(2);

  return Number(result);
}

/**
 * Parse expression to Revers Polish Notaton(RPN) via Shuting yard algorithm
 * @param {Array} expression
 * @returns {Array} Revers Polish Notaton
 */
function parseExpression(expression) {
  const stack = [];
  const rpn = [];

  expression.forEach((char) => {
    if (isNumber(char)) {
      rpn.push(char);
    } else {
      while (stack.length && opPreced(stack[stack.length - 1]) >= opPreced(char)) {
        const operator = stack.pop();
        rpn.push(operator);
      }
      stack.push(char);
    }
  });

  while (stack.length) {
    const operator = stack.pop();
    rpn.push(operator);
  }

  return rpn;
}

/**
 * Calculate user input
 * @param {Array} userInput
 * @returns {Number}
 */
export function calculate(userInput) {
  const rpn = parseExpression(userInput);
  const result = calculateReversePolishNotation(rpn);

  return result;
}
