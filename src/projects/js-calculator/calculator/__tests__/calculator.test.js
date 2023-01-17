import * as calculator from "../calculator";

describe("calculator.js", () => {
  it.each`
    arg    | result
    ${1}   | ${-1}
    ${-15} | ${15}
    ${0}   | ${0}
  `("invertNumber should invert $arg to $result", ({ arg, result }) => {
    const { invertNumber } = calculator;

    expect(invertNumber(arg)).toBe(result);
  });

  it.each`
    operator      | result
    ${"+"}        | ${true}
    ${"-"}        | ${true}
    ${"*"}        | ${true}
    ${"/"}        | ${true}
    ${"."}        | ${false}
    ${"operator"} | ${false}
  `("isOperator should return '$result' if passed '$operator'", ({ operator, result }) => {
    const { isOperator } = calculator;

    expect(isOperator(operator)).toBe(result);
  });

  it.each`
    arg         | result
    ${1}        | ${true}
    ${1.01}     | ${true}
    ${"1"}      | ${true}
    ${".01"}    | ${true}
    ${"1.01"}   | ${true}
    ${"1.a01"}  | ${true}
    ${"a1.a01"} | ${false}
    ${""}       | ${false}
    ${NaN}      | ${false}
  `("isNumber should return '$result' if passed $arg", ({ arg, result }) => {
    const { isNumber } = calculator;

    expect(isNumber(arg)).toBe(result);
  });

  it.each`
    expression             | result
    ${[2, "+", 2]}         | ${[2, 2, "+"]}
    ${[2, "+", 2, "*", 2]} | ${[2, 2, 2, "*", "+"]}
  `(
    "parseExpression should parse expression: $expression to RPN: $result",
    ({ expression, result }) => {
      const { parseExpression } = calculator;

      expect(parseExpression(expression)).toEqual(result);
    },
  );

  it.each`
    rpn                    | result
    ${[2, 2, "+"]}         | ${4}
    ${[2, 2, 2, "*", "+"]} | ${6}
  `(
    "calculateReversePolishNotation should correct calculate RPN: $rpn as $result",
    ({ rpn, result }) => {
      const { calculateReversePolishNotation } = calculator;

      expect(calculateReversePolishNotation(rpn)).toBe(result);
    },
  );

  it.each`
    expression             | result
    ${[2, "+", 2]}         | ${4}
    ${[2, "+", 2, "*", 2]} | ${6}
  `("calculate should calculate expression: $expression as $result", ({ expression, result }) => {
    const { calculate } = calculator;

    expect(calculate(expression)).toEqual(result);
  });
});
