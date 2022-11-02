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

export const invertNumber = (number) => number * -1;

const OPERATORS_PRIORITY = {
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1,
};

const opPreced = (op) => OPERATORS_PRIORITY[op];

const OPERATORS = Object.keys(OPERATORS_PRIORITY);

export const isOperator = (char) => OPERATORS.includes(char);

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

  let i = 0;
  while (i < rpn.length) {
    const char = rpn[i];

    if (typeof char === "number") {
      stack.push(char);
      i += 1;
    }

    if (isOperator(char)) {
      if (stack.length > 1) {
        const math = MATHS[char];
        const [a, b] = stack.splice(LAST_TWO_ITEMS);
        const result = math(a, b);

        stack.push(result);
        i += 1;
      } else if (char === "-") {
        const [a] = stack.splice(-1);
        const result = invertNumber(a);

        stack.push(result);
        i += 1;
      } else {
        const nextChar = rpn[i + 1];

        if (typeof nextChar === "number") {
          stack.push(nextChar);
        }

        rpn.splice(i + 1, 1);
      }
    }
  }

  const result = Number(stack.pop()).toPrecision(4);

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
 * @param {Array} expression
 * @returns {Number}
 */
export function calculate(expression) {
  const rpn = parseExpression(expression);
  const result = calculateReversePolishNotation(rpn);

  return result;
}
