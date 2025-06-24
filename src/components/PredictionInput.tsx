import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { predictValue } from '../utils/regression';

interface PredictionInputProps {
  slope: number;
  intercept: number;
}

export function PredictionInput({ slope, intercept }: PredictionInputProps) {
  const [inputValue, setInputValue] = useState<string>('85');
  const [prediction, setPrediction] = useState<number | null>(null);
  
  const handlePredict = () => {
    const x = parseFloat(inputValue);
    if (!isNaN(x)) {
      const predicted = predictValue(x, slope, intercept);
      setPrediction(predicted);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePredict();
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-lg border border-green-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Calculator className="mr-2 text-green-600" size={24} />
        Prediction Tool
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="midterm-input" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Midterm Score (x):
          </label>
          <div className="flex space-x-3">
            <input
              id="midterm-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter midterm score"
            />
            <button
              onClick={handlePredict}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
            >
              Predict
            </button>
          </div>
        </div>
        
        {prediction !== null && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <h4 className="font-semibold text-gray-700 mb-2">Prediction Result</h4>
            <p className="text-gray-600 mb-2">
              For midterm score of <span className="font-bold text-green-600">{inputValue}</span>:
            </p>
            <p className="text-2xl font-bold text-green-600">
              Predicted Final Exam Score: {prediction.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Calculation: ŷ = {intercept.toFixed(4)} + {slope.toFixed(4)} × {inputValue} = {prediction.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}