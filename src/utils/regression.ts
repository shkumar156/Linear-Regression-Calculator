import { DataPoint, RegressionResult } from '../types';

export function calculateLinearRegression(xValues: number[], yValues: number[]): RegressionResult {
  const n = xValues.length;
  
  // Calculate sums with high precision
  const sumX = xValues.reduce((sum, x) => sum + x, 0);
  const sumY = yValues.reduce((sum, y) => sum + y, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumXSquared = xValues.reduce((sum, x) => sum + x * x, 0);
  const sumYSquared = yValues.reduce((sum, y) => sum + y * y, 0);
  
  // Calculate slope (b) and intercept (a) with high precision
  const numerator = n * sumXY - sumX * sumY;
  const denominator = n * sumXSquared - sumX * sumX;
  const slope = numerator / denominator;
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R-squared
  const yMean = sumY / n;
  const totalSumSquares = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
  const residualSumSquares = yValues.reduce((sum, y, i) => {
    const yPred = intercept + slope * xValues[i];
    return sum + Math.pow(y - yPred, 2);
  }, 0);
  const rSquared = 1 - (residualSumSquares / totalSumSquares);
  
  // Create data points with calculations
  const dataPoints: DataPoint[] = xValues.map((x, i) => ({
    x,
    y: yValues[i],
    xSquared: x * x,
    xy: x * yValues[i],
    yPredicted: intercept + slope * x
  }));
  
  // Debug logging for verification
  console.log('Calculation Details:');
  console.log('n =', n);
  console.log('Σx =', sumX);
  console.log('Σy =', sumY);
  console.log('Σxy =', sumXY);
  console.log('Σx² =', sumXSquared);
  console.log('Numerator (n*Σxy - Σx*Σy) =', numerator);
  console.log('Denominator (n*Σx² - (Σx)²) =', denominator);
  console.log('Slope (b) =', slope);
  console.log('Intercept (a) =', intercept);
  console.log('For x=85: ŷ =', intercept + slope * 85);
  
  return {
    slope,
    intercept,
    rSquared,
    dataPoints
  };
}

export function predictValue(x: number, slope: number, intercept: number): number {
  return intercept + slope * x;
}