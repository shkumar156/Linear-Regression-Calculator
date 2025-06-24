export interface DataPoint {
  x: number;
  y: number;
  xSquared: number;
  xy: number;
  yPredicted: number;
}

export interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  dataPoints: DataPoint[];
}

export interface ChartData {
  original: { x: number; y: number }[];
  regression: { x: number; y: number }[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}