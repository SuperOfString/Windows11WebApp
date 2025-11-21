import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    const current = parseFloat(display);
    
    if (prevValue !== null && operator) {
      const result = calculate(prevValue, current, operator);
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(current);
    }
    
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (operator && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operator);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const btnClass = "flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 active:bg-gray-200";
  const opClass = "flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-100 hover:bg-gray-200 text-orange-600 active:bg-orange-100";
  const equalClass = "flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-orange-500 hover:bg-orange-600 text-white shadow-sm active:scale-95";

  return (
    <div className="h-full flex flex-col p-4 bg-[#f3f3f3]">
      <div className="flex-1 flex items-end justify-end mb-4 px-2">
        <span className="text-4xl font-light text-gray-900 break-all">{display}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 h-3/4">
        <button onClick={() => setDisplay('0')} className={btnClass}>CE</button>
        <button onClick={handleClear} className={btnClass}>C</button>
        <button onClick={handleBackspace} className={btnClass}><Delete className="w-4 h-4" /></button>
        <button onClick={() => handleOp('÷')} className={opClass}>÷</button>
        
        <button onClick={() => handleNum('7')} className={`bg-white shadow-sm ${btnClass}`}>7</button>
        <button onClick={() => handleNum('8')} className={`bg-white shadow-sm ${btnClass}`}>8</button>
        <button onClick={() => handleNum('9')} className={`bg-white shadow-sm ${btnClass}`}>9</button>
        <button onClick={() => handleOp('×')} className={opClass}>×</button>
        
        <button onClick={() => handleNum('4')} className={`bg-white shadow-sm ${btnClass}`}>4</button>
        <button onClick={() => handleNum('5')} className={`bg-white shadow-sm ${btnClass}`}>5</button>
        <button onClick={() => handleNum('6')} className={`bg-white shadow-sm ${btnClass}`}>6</button>
        <button onClick={() => handleOp('-')} className={opClass}>-</button>
        
        <button onClick={() => handleNum('1')} className={`bg-white shadow-sm ${btnClass}`}>1</button>
        <button onClick={() => handleNum('2')} className={`bg-white shadow-sm ${btnClass}`}>2</button>
        <button onClick={() => handleNum('3')} className={`bg-white shadow-sm ${btnClass}`}>3</button>
        <button onClick={() => handleOp('+')} className={opClass}>+</button>
        
        <button onClick={() => {}} className={btnClass}>+/-</button>
        <button onClick={() => handleNum('0')} className={`bg-white shadow-sm ${btnClass}`}>0</button>
        <button onClick={() => handleNum('.')} className={`bg-white shadow-sm ${btnClass}`}>.</button>
        <button onClick={handleEqual} className={equalClass}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
