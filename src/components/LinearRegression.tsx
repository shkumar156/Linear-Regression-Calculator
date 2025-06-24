import React, { useState } from 'react';
import { TrendingUp, BookOpen } from 'lucide-react';
import { calculateLinearRegression } from '../utils/regression';
import { DataInput } from './DataInput';
import { CalculationProcedure } from './CalculationProcedure';
import { Chart } from './Chart';
import { DataTable } from './DataTable';
import { RegressionStats } from './RegressionStats';
import { QuestionAnswers } from './QuestionAnswers';
import { ChartData } from '../types';

export function LinearRegression() {
  const [xValues, setXValues] = useState<number[]>([]);
  const [yValues, setYValues] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isDataValid, setIsDataValid] = useState(false);

  const handleDataSubmit = (newXValues: number[], newYValues: number[]) => {
    setXValues(newXValues);
    setYValues(newYValues);
    const regressionResult = calculateLinearRegression(newXValues, newYValues);
    setResult(regressionResult);
    setIsDataValid(true);
  };

  // Prepare chart data if we have results
  let chartData: ChartData | null = null;
  if (result && xValues.length > 0 && yValues.length > 0) {
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    
    chartData = {
      original: xValues.map((x, i) => ({ x, y: yValues[i] })),
      regression: [
        { x: minX, y: result.intercept + result.slope * minX },
        { x: maxX, y: result.intercept + result.slope * maxX }
      ],
      minX: Math.min(minX, minY) - 10,
      maxX: Math.max(maxX, maxY) + 10,
      minY: Math.min(minX, minY) - 10,
      maxY: Math.max(maxX, maxY) + 10
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Enhanced Header - Mobile Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 rounded-2xl shadow-xl mb-4 sm:mb-0 sm:mr-4">
              <TrendingUp className="text-white" size={32} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Linear Regression Calculator
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                by Muhammad Umar (FA21-BCS-126)
              </p>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <BookOpen className="text-gray-500 mr-2" size={16} />
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Statistical Analysis Tool</span>
              </div>
            </div>
          </div>
          <p className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-2">
            Perform linear regression analysis with step-by-step calculations and visual representations
          </p>
        </div>

        {/* Data Input */}
        <DataInput onDataSubmit={handleDataSubmit} isDataValid={isDataValid} />

        {/* Results - Only show if we have valid data */}
        {result && isDataValid && (
          <div className="space-y-8 sm:space-y-12">
            {/* Calculation Procedure */}
            <CalculationProcedure 
              xValues={xValues}
              yValues={yValues}
              slope={result.slope}
              intercept={result.intercept}
            />

            {/* Questions and Answers */}
            <QuestionAnswers slope={result.slope} intercept={result.intercept} />
            
            {/* Statistics */}
            <RegressionStats result={result} />
            
            {/* Chart */}
            {chartData && <Chart data={chartData} width={900} height={600} />}
            
            {/* Data Table */}
            <DataTable 
              dataPoints={result.dataPoints} 
              intercept={result.intercept}
              slope={result.slope}
            />
          </div>
        )}
        
        {/* Enhanced Footer - Mobile Responsive */}
        <div className="text-center mt-12 sm:mt-16 pt-8 sm:pt-10 border-t-2 border-gray-200">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg inline-block">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              📊 Linear Regression Analysis
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Accurate mathematical calculations with detailed step-by-step procedures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}