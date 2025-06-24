import React from 'react';
import { Calculator } from 'lucide-react';

interface CalculationProcedureProps {
  xValues: number[];
  yValues: number[];
  slope: number;
  intercept: number;
}

export function CalculationProcedure({ xValues, yValues, slope, intercept }: CalculationProcedureProps) {
  const n = xValues.length;
  const sumX = xValues.reduce((sum, x) => sum + x, 0);
  const sumY = yValues.reduce((sum, y) => sum + y, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumXSquared = xValues.reduce((sum, x) => sum + x * x, 0);

  // Let's recalculate to verify
  const calculatedSlope = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX * sumX);
  const calculatedIntercept = (sumY - calculatedSlope * sumX) / n;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-8 rounded-2xl shadow-xl border border-purple-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
        <Calculator className="mr-3 text-purple-600" size={24} />
        Step-by-Step Calculation Procedure
      </h3>
      
      <div className="space-y-6 sm:space-y-8">
        {/* Step 1: Calculate Sums */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h4 className="text-base sm:text-lg font-bold text-gray-700 mb-4 text-center bg-blue-50 py-2 rounded-lg">
            Step 1: Calculate Required Sums
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 text-center">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="font-semibold text-gray-600 text-xs sm:text-sm">Number of points</p>
              <p className="text-lg sm:text-xl font-bold text-blue-600">n = {n}</p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <p className="font-semibold text-gray-600 text-xs sm:text-sm">Sum of X</p>
              <p className="text-lg sm:text-xl font-bold text-green-600">Σx = {sumX}</p>
            </div>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <p className="font-semibold text-gray-600 text-xs sm:text-sm">Sum of Y</p>
              <p className="text-lg sm:text-xl font-bold text-orange-600">Σy = {sumY}</p>
            </div>
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <p className="font-semibold text-gray-600 text-xs sm:text-sm">Sum of XY</p>
              <p className="text-lg sm:text-xl font-bold text-purple-600">Σxy = {sumXY}</p>
            </div>
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg col-span-2 sm:col-span-1">
              <p className="font-semibold text-gray-600 text-xs sm:text-sm">Sum of X²</p>
              <p className="text-lg sm:text-xl font-bold text-red-600">Σx² = {sumXSquared}</p>
            </div>
          </div>
        </div>

        {/* Step 2: Calculate Slope */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h4 className="text-base sm:text-lg font-bold text-gray-700 mb-4 text-center bg-green-50 py-2 rounded-lg">
            Step 2: Calculate Slope (b)
          </h4>
          <div className="space-y-3 sm:space-y-4 text-center">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono font-bold text-gray-800">
                b = (n·Σxy - Σx·Σy) / (n·Σx² - (Σx)²)
              </p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono text-blue-800">
                b = ({n} × {sumXY} - {sumX} × {sumY}) / ({n} × {sumXSquared} - {sumX}²)
              </p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono text-blue-800">
                b = ({n * sumXY} - {sumX * sumY}) / ({n * sumXSquared} - {sumX * sumX})
              </p>
            </div>
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono text-blue-800">
                b = {n * sumXY - sumX * sumY} / {n * sumXSquared - sumX * sumX}
              </p>
            </div>
            <div className="bg-green-100 p-3 sm:p-4 rounded-lg border-2 border-green-300">
              <p className="text-lg sm:text-xl font-mono font-bold text-green-800">
                b = {calculatedSlope.toFixed(8)}
              </p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">
                Rounded: b = {calculatedSlope.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Calculate Intercept */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h4 className="text-base sm:text-lg font-bold text-gray-700 mb-4 text-center bg-orange-50 py-2 rounded-lg">
            Step 3: Calculate Intercept (a)
          </h4>
          <div className="space-y-3 sm:space-y-4 text-center">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono font-bold text-gray-800">
                a = (Σy - b·Σx) / n
              </p>
            </div>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono text-orange-800">
                a = ({sumY} - {calculatedSlope.toFixed(8)} × {sumX}) / {n}
              </p>
            </div>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono text-orange-800">
                a = ({sumY} - {(calculatedSlope * sumX).toFixed(8)}) / {n}
              </p>
            </div>
            <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg font-mono text-orange-800">
                a = {(sumY - calculatedSlope * sumX).toFixed(8)} / {n}
              </p>
            </div>
            <div className="bg-green-100 p-3 sm:p-4 rounded-lg border-2 border-green-300">
              <p className="text-lg sm:text-xl font-mono font-bold text-green-800">
                a = {calculatedIntercept.toFixed(8)}
              </p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">
                Rounded: a = {calculatedIntercept.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}