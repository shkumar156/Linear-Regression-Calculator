import React, { useState } from 'react';
import { HelpCircle, Calculator } from 'lucide-react';
import { predictValue } from '../utils/regression';

interface QuestionAnswersProps {
  slope: number;
  intercept: number;
}

export function QuestionAnswers({ slope, intercept }: QuestionAnswersProps) {
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
    <div className="space-y-8 sm:space-y-10">
      {/* Question A */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-8 rounded-2xl shadow-xl border-2 border-blue-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold">A</div>
          Question (A): Find the equation of regression line
        </h3>
        
        <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100">
          <h4 className="text-lg sm:text-xl font-bold text-gray-700 mb-4 sm:mb-6 text-center bg-blue-50 py-2 sm:py-3 rounded-lg">
            📐 Answer:
          </h4>
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-4 sm:p-6 rounded-xl border-2 border-blue-300">
              <p className="text-xl sm:text-3xl font-mono font-bold text-blue-800 mb-2">
                ŷ = {intercept.toFixed(4)} + {slope.toFixed(4)}x
              </p>
              <p className="text-xs sm:text-sm text-blue-600">Linear Regression Equation</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg">
            <p className="font-bold text-gray-700 mb-3 text-sm sm:text-base">📋 Equation Components:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600">Intercept (a)</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">{intercept.toFixed(4)}</p>
                
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-600">Slope (b)</p>
                <p className="text-lg sm:text-xl font-bold text-green-600">{slope.toFixed(4)}</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question B */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-8 rounded-2xl shadow-xl border-2 border-green-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <div className="bg-green-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg font-bold">B</div>
          Question (B): Estimate the grade of a student who received a grade on the midterm but was ill at the time of the final examination
        </h3>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-green-100">
            <label htmlFor="midterm-input" className="block text-base sm:text-lg font-semibold text-gray-700 mb-3">
              🎯 Enter Midterm Score (x):
            </label>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                id="midterm-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 sm:p-4 text-base sm:text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all shadow-sm"
                placeholder="Enter midterm score (e.g., 85)"
              />
              <button
                onClick={handlePredict}
                className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
              >
                Calculate
              </button>
            </div>
          </div>
          
          {prediction !== null && (
            <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border-2 border-green-300">
              <h4 className="text-lg sm:text-xl font-bold text-gray-700 mb-4 sm:mb-6 text-center bg-green-50 py-2 sm:py-3 rounded-lg">
                🎓 Answer:
              </h4>
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <p className="text-base sm:text-lg text-gray-600 mb-4">
                    For a student with midterm score of <span className="font-bold text-green-600 text-lg sm:text-xl">{inputValue}</span>:
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 sm:p-6 rounded-xl border border-green-200">
                  <h5 className="font-bold text-gray-700 mb-3 sm:mb-4 text-center text-sm sm:text-base">📊 Step-by-Step Calculation:</h5>
                  <div className="space-y-2 sm:space-y-3 text-center">
                    <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                      <p className="font-mono text-sm sm:text-lg text-gray-700">
                        ŷ = {intercept.toFixed(4)} + {slope.toFixed(4)} × {inputValue}
                      </p>
                    </div>
                    <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                      <p className="font-mono text-sm sm:text-lg text-gray-700">
                        ŷ = {intercept.toFixed(4)} + {(slope * parseFloat(inputValue)).toFixed(4)}
                      </p>
                    </div>
                    <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
                      <p className="font-mono text-sm sm:text-lg text-gray-700">
                        ŷ = {prediction.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 sm:p-6 rounded-xl border-2 border-green-300 text-center">
                  <p className="text-base sm:text-lg text-gray-700 mb-2">🎯 Final Answer:</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                    Estimated Final Exam Score: {prediction.toFixed(2)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    The student is estimated to score approximately <strong>{prediction.toFixed(2)}</strong> on the final examination.
                  </p>
                </div>

                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}