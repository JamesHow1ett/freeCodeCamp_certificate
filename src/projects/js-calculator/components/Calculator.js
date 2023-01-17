import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearState, setInput, calculateExpression } from "../store/calculatorReducer";

// export for testing
export const defaultBtnClasses =
  "relative h-[65px] w-[80px] text-white outline outline-1 outline-black border-none bg-[#4d4d4d] font-mono text-xl cursor-default hover:text-black hover:outline hover:outline-[0.05rem] hover:outline-[#808080] hover:z-[3]";

function Calculator() {
  const { input, display } = useSelector((store) => store.calculator);
  const dispatch = useDispatch();

  const handleClearState = () => dispatch(clearState());

  const handleInput = (event) => dispatch(setInput(event.target.value));

  const handleCalculateExpression = () => dispatch(calculateExpression());

  return (
    <div className="w-full h-screen bg-[#c2c2d6] flex justify-center items-center">
      <div className="w-[333px] border-2 border-[#47476b] p-1 bg-black relative">
        <div
          data-testid="input-row"
          className="min-h-[30px] font-mono text-xl text-orange-500 text-right align-top break"
        >
          {input}
        </div>
        <div id="display" data-testid="display" className="text-[29px] text-white text-right">
          {display}
        </div>
        <div>
          <button
            className={`${defaultBtnClasses} w-[160px] bg-[#ac3939]`}
            type="button"
            id="clear"
            data-testid="clear"
            value="AC"
            onClick={handleClearState}
          >
            AC
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="divide"
            data-testid="divide"
            value="/"
            onClick={handleInput}
          >
            /
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="multiply"
            data-testid="multiply"
            value="*"
            onClick={handleInput}
          >
            x
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="seven"
            data-testid="seven"
            value="7"
            onClick={handleInput}
          >
            7
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="eight"
            data-testid="eight"
            value="8"
            onClick={handleInput}
          >
            8
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="nine"
            data-testid="nine"
            value="9"
            onClick={handleInput}
          >
            9
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="subtract"
            data-testid="subtract"
            value="-"
            onClick={handleInput}
          >
            ‑
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="four"
            data-testid="four"
            value="4"
            onClick={handleInput}
          >
            4
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="five"
            data-testid="five"
            value="5"
            onClick={handleInput}
          >
            5
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="six"
            data-testid="six"
            value="6"
            onClick={handleInput}
          >
            6
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="add"
            data-testid="add"
            value="+"
            onClick={handleInput}
          >
            +
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="one"
            data-testid="one"
            value="1"
            onClick={handleInput}
          >
            1
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="two"
            data-testid="two"
            value="2"
            onClick={handleInput}
          >
            2
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="three"
            data-testid="three"
            value="3"
            onClick={handleInput}
          >
            3
          </button>
          <button
            className={`${defaultBtnClasses} w-[160px]`}
            type="button"
            id="zero"
            data-testid="zero"
            value="0"
            onClick={handleInput}
          >
            0
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="decimal"
            data-testid="decimal"
            value="."
            onClick={handleInput}
          >
            .
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#004466] !absolute h-[130px] bottom-[5px]`}
            type="button"
            id="equals"
            data-testid="equals"
            value="="
            onClick={handleCalculateExpression}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
