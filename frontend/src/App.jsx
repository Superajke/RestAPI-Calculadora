import "./css/App.css";
import { calculate } from "./api/calculator.api";
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleDigit = (digit) => {
    setDisplay((prevDisplay) => prevDisplay + digit);
  };

  const handleOperation = async (op) => {
    if (previousValue === null) {
      setOperation(op);
      setPreviousValue(display);
      setDisplay("");
    } else if (operation) {
      const result = await performCalculation();
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
  };

  const performCalculation = async () => {
    try {
      const data = {
        num1: parseFloat(previousValue),
        num2: parseFloat(display),
        operation,
      };
      const response = await calculate(data);
      setOperation(null);
      return response.data.result;
    } catch (error) {
      console.error("Error making the calculation:", error);
      return "Error";
    }
  };

  const handleEquals = async () => {
    const result = await performCalculation();
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
  };

  const handleClear = () => {
    setDisplay("");
    setPreviousValue(null);
    setOperation(null);
  };

  const handleDelete = () => {
    setDisplay((prevDisplay) => prevDisplay.slice(0, -1));
  };

  return (
    <div className="calculator">
      <h2>Calculadora</h2>
      <div className="display">{display}</div>
      <div className="keypad">
        <button onClick={handleClear} className="top-btn">
          Off
        </button>
        <button onClick={handleClear} className="top-btn">
          AC
        </button><button onClick={handleDelete} className="top-btn">
          DEL
        </button>
        <button onClick={() => handleOperation("divide")} className="side-btn">
          ÷
        </button>
        <button onClick={() => handleDigit("7")}>7</button>
        <button onClick={() => handleDigit("8")}>8</button>
        <button onClick={() => handleDigit("9")}>9</button>
        <button
          onClick={() => handleOperation("multiply")}
          className="side-btn"
        >
          ×
        </button>
        <button onClick={() => handleDigit("4")}>4</button>
        <button onClick={() => handleDigit("5")}>5</button>
        <button onClick={() => handleDigit("6")}>6</button>
        <button
          onClick={() => handleOperation("subtract")}
          className="side-btn"
        >
          -
        </button>
        <button onClick={() => handleDigit("1")}>1</button>
        <button onClick={() => handleDigit("2")}>2</button>
        <button onClick={() => handleDigit("3")}>3</button>
        <button onClick={() => handleOperation("add")} className="side-btn">
          +
        </button>
        <button onClick={() => handleDigit(".")}>.</button>
        <button onClick={() => handleDigit("0")}>0</button>
        <button onClick={handleEquals} className="equals-btn">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
