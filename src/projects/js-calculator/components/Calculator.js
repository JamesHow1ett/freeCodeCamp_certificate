import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearState, setInput, calculateExpression } from "../store/calculatorReducer";

const defaultBtnClasses =
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
        <div className="min-h-[30px] font-mono text-xl text-orange-500 text-right align-top break">
          {input}
        </div>
        <div id="display" className="text-[29px] text-white text-right">
          {display}
        </div>
        <div>
          <button
            className={`${defaultBtnClasses} w-[160px] bg-[#ac3939]`}
            type="button"
            id="clear"
            value="AC"
            onClick={handleClearState}
          >
            AC
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="divide"
            value="/"
            onClick={handleInput}
          >
            /
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="multiply"
            value="*"
            onClick={handleInput}
          >
            x
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="seven"
            value="7"
            onClick={handleInput}
          >
            7
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="eight"
            value="8"
            onClick={handleInput}
          >
            8
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="nine"
            value="9"
            onClick={handleInput}
          >
            9
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="subtract"
            value="-"
            onClick={handleInput}
          >
            ‑
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="four"
            value="4"
            onClick={handleInput}
          >
            4
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="five"
            value="5"
            onClick={handleInput}
          >
            5
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="six"
            value="6"
            onClick={handleInput}
          >
            6
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#666666]`}
            type="button"
            id="add"
            value="+"
            onClick={handleInput}
          >
            +
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="one"
            value="1"
            onClick={handleInput}
          >
            1
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="two"
            value="2"
            onClick={handleInput}
          >
            2
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="three"
            value="3"
            onClick={handleInput}
          >
            3
          </button>
          <button
            className={`${defaultBtnClasses} w-[160px]`}
            type="button"
            id="zero"
            value="0"
            onClick={handleInput}
          >
            0
          </button>
          <button
            className={defaultBtnClasses}
            type="button"
            id="decimal"
            value="."
            onClick={handleInput}
          >
            .
          </button>
          <button
            className={`${defaultBtnClasses} bg-[#004466] !absolute h-[130px] bottom-[5px]`}
            type="button"
            id="equals"
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
