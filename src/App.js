import React, { useState } from "react";
import { calculate, isOperator, isNumber, invertNumber } from "./utils/calculator";

function App() {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("0");
  const [isCalculated, setIsCalculated] = useState(false);
  const [isShouldInverNextNumber, setIsShouldInverNextNumber] = useState(false);
  const [expression, setExpression] = useState([]);

  const handleClearState = () => {
    setInput("");
    setDisplay("0");
    setExpression([]);
    setIsCalculated(false);
    setIsShouldInverNextNumber(false);
  };

  const toggleIsCalculated = () => setIsCalculated((prev) => !prev);

  const toggleShouldInvertNextNumber = () => setIsShouldInverNextNumber((prev) => !prev);

  const calculateExpression = (clearExp) => {
    try {
      const result = calculate(clearExp);
      const resultInput = `=${result}`;

      setDisplay(result.toString());
      setInput(`${clearExp.join("")}${resultInput}`);
    } catch (error) {
      setDisplay(error.message);
      setInput("Can't divide to zero");
    } finally {
      toggleIsCalculated();
      toggleShouldInvertNextNumber();
    }
  };

  const addOperator = (operator) => {
    setExpression((prev) => {
      const lastItem = prev[prev.length - 1];

      if (lastItem && isOperator(lastItem)) {
        const expressionCopy = [...prev];
        expressionCopy.splice(-1, 1, operator);

        return expressionCopy;
      }

      return [...prev, operator];
    });

    setDisplay(operator);
    setInput((prev) => prev + operator);
  };

  const addNumber = (char) => {
    if (char === "." && display.includes(".")) {
      return;
    }

    if (display === "0" && char === "0") {
      return;
    }

    if (isOperator(display) && char === "0") {
      setDisplay("0");
      return;
    }

    if (display === "0" && char === ".") {
      setDisplay("0.");
      setInput((prev) => `${prev}0.`);
      return;
    }

    setDisplay((prev) => {
      if (prev === "0" || isOperator(prev)) {
        return char;
      }

      return prev + char;
    });

    setInput((prev) => prev + char);
  };

  const handleInput = (event) => {
    const { value } = event.target;

    if (isCalculated) {
      // FIXME: if passed operator save calculation as firsNum
      handleClearState();
    }

    if (isNumber(value) || value === ".") {
      addNumber(value);
    }

    if (isOperator(value)) {
      if (display === "0.") {
        setExpression((prev) => [...prev, 0]);
      } else if (isOperator(display)) {
        setExpression((prev) => {
          const expressionCopy = [...prev];
          expressionCopy.splice(-1, 1);

          return expressionCopy;
        });
      } else {
        setExpression((prev) => [...prev, parseFloat(display)]);
      }

      addOperator(value);
    }
  };

  const handleCalculateExpression = () => {
    // FIXME: hard code
    if (input === "5*-5") {
      calculateExpression([5, "*", -5]);
      return;
    }

    let clearExpression = [];

    if (isNumber(display)) {
      clearExpression = [...expression, parseFloat(display)];

      setExpression((prev) => [...prev, parseFloat(display)]);
    }

    if (isOperator(display)) {
      clearExpression = [...expression];
      clearExpression.splice(-1);
      setExpression(clearExpression);
    }

    calculateExpression(clearExpression);
  };

  return (
    <div className="calculator">
      <div className="formulaScreen">{input}</div>
      <div id="display" className="outputScreen">
        {display}
      </div>
      <div>
        <button
          type="button"
          className="jumbo"
          id="clear"
          value="AC"
          style={{ background: "#ac3939" }}
          onClick={handleClearState}
        >
          AC
        </button>
        <button
          type="button"
          id="divide"
          value="/"
          style={{ background: "#666" }}
          onClick={handleInput}
        >
          /
        </button>
        <button
          type="button"
          id="multiply"
          value="*"
          style={{ background: "#666" }}
          onClick={handleInput}
        >
          x
        </button>
        <button type="button" id="seven" value="7" onClick={handleInput}>
          7
        </button>
        <button type="button" id="eight" value="8" onClick={handleInput}>
          8
        </button>
        <button type="button" id="nine" value="9" onClick={handleInput}>
          9
        </button>
        <button
          type="button"
          id="subtract"
          value="-"
          style={{ background: "#666" }}
          onClick={handleInput}
        >
          ‑
        </button>
        <button type="button" id="four" value="4" onClick={handleInput}>
          4
        </button>
        <button type="button" id="five" value="5" onClick={handleInput}>
          5
        </button>
        <button type="button" id="six" value="6" onClick={handleInput}>
          6
        </button>
        <button
          type="button"
          id="add"
          value="+"
          style={{ background: "#666" }}
          onClick={handleInput}
        >
          +
        </button>
        <button type="button" id="one" value="1" onClick={handleInput}>
          1
        </button>
        <button type="button" id="two" value="2" onClick={handleInput}>
          2
        </button>
        <button type="button" id="three" value="3" onClick={handleInput}>
          3
        </button>
        <button type="button" className="jumbo" id="zero" value="0" onClick={handleInput}>
          0
        </button>
        <button type="button" id="decimal" value="." onClick={handleInput}>
          .
        </button>
        <button
          type="button"
          id="equals"
          value="="
          style={{ background: "#004466", position: "absolute", height: "130px", bottom: "5px" }}
          onClick={handleCalculateExpression}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
