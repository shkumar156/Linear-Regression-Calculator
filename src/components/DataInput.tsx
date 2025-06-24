import React, { useState } from 'react';
import { Database, AlertCircle } from 'lucide-react';

interface DataInputProps {
  onDataSubmit: (xValues: number[], yValues: number[]) => void;
  isDataValid: boolean;
}

export function DataInput({ onDataSubmit, isDataValid }: DataInputProps) {
  const [xInput, setXInput] = useState('77, 50, 71, 72, 81, 94, 96, 99, 67');
  const [yInput, setYInput] = useState('82, 66, 78, 34, 47, 85, 99, 99, 68');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      const xValues = xInput.split(',').map(val => {
        const num = parseFloat(val.trim());
        if (isNaN(num)) throw new Error('Invalid number in X values');
        return num;
      });

      const yValues = yInput.split(',').map(val => {
        const num = parseFloat(val.trim());
        if (isNaN(num)) throw new Error('Invalid number in Y values');
        return num;
      });

      if (xValues.length !== yValues.length) {
        setError('Number of X values must equal number of Y values');
        return;
      }

      if (xValues.length < 2) {
        setError('At least 2 data points are required');
        return;
      }

      setError('');
      onDataSubmit(xValues, yValues);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input format');
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Database className="mr-2 text-blue-600" size={20} />
        Data Input
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="x-values" className="block text-sm font-medium text-gray-700 mb-2">
            X Values (Midterm Scores):
          </label>
          <textarea
            id="x-values"
            value={xInput}
            onChange={(e) => setXInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
            rows={3}
            placeholder="Enter comma-separated values (e.g., 77, 50, 71, 72)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Count: {xInput.split(',').filter(v => v.trim()).length} values
          </p>
        </div>
        
        <div>
          <label htmlFor="y-values" className="block text-sm font-medium text-gray-700 mb-2">
            Y Values (Final Exam Scores):
          </label>
          <textarea
            id="y-values"
            value={yInput}
            onChange={(e) => setYInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
            rows={3}
            placeholder="Enter comma-separated values (e.g., 82, 66, 78, 34)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Count: {yInput.split(',').filter(v => v.trim()).length} values
          </p>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="text-red-500 mr-2 flex-shrink-0" size={18} />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}
      
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm sm:text-base w-full sm:w-auto"
        >
          Calculate Regression
        </button>
      </div>
      
      {isDataValid && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-center text-sm sm:text-base">✓ Data validated successfully! Results displayed below.</p>
        </div>
      )}
    </div>
  );
}