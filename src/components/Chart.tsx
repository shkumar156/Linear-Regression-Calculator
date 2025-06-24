import React from 'react';
import { ChartData } from '../types';

interface ChartProps {
  data: ChartData;
  width?: number;
  height?: number;
}

export function Chart({ data, width = 800, height = 500 }: ChartProps) {
  const margin = { top: 40, right: 40, bottom: 80, left: 80 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const xRange = data.maxX - data.minX;
  const yRange = data.maxY - data.minY;
  const xPadding = xRange * 0.1;
  const yPadding = yRange * 0.1;
  
  const xScale = (x: number) => ((x - data.minX + xPadding) / (xRange + 2 * xPadding)) * chartWidth;
  const yScale = (y: number) => chartHeight - ((y - data.minY + yPadding) / (yRange + 2 * yPadding)) * chartHeight;
  
  // Generate tick marks
  const xTicks = Array.from({ length: 8 }, (_, i) => 
    Math.round(data.minX + (i * xRange) / 7)
  );
  const yTicks = Array.from({ length: 8 }, (_, i) => 
    Math.round(data.minY + (i * yRange) / 7)
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📊 Scatter Plot with Linear Regression Line
      </h3>
      <div className="flex justify-center">
        <svg width={width} height={height} className="border-2 border-gray-300 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          {/* Background grid */}
          {xTicks.map(tick => (
            <line
              key={`x-grid-${tick}`}
              x1={margin.left + xScale(tick)}
              y1={margin.top}
              x2={margin.left + xScale(tick)}
              y2={height - margin.bottom}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}
          {yTicks.map(tick => (
            <line
              key={`y-grid-${tick}`}
              x1={margin.left}
              y1={margin.top + yScale(tick)}
              x2={width - margin.right}
              y2={margin.top + yScale(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}
          
          {/* Main axes */}
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke="#1f2937"
            strokeWidth="3"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="#1f2937"
            strokeWidth="3"
          />
          
          {/* Regression line */}
          <line
            x1={margin.left + xScale(data.regression[0].x)}
            y1={margin.top + yScale(data.regression[0].y)}
            x2={margin.left + xScale(data.regression[data.regression.length - 1].x)}
            y2={margin.top + yScale(data.regression[data.regression.length - 1].y)}
            stroke="#2563eb"
            strokeWidth="4"
            className="drop-shadow-lg"
          />
          
          {/* Data points with values */}
          {data.original.map((point, i) => {
            const cx = margin.left + xScale(point.x);
            const cy = margin.top + yScale(point.y);
            return (
              <g key={i}>
                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="8"
                  fill="#dc2626"
                  stroke="#ffffff"
                  strokeWidth="3"
                  className="drop-shadow-lg hover:r-10 transition-all duration-200 cursor-pointer"
                />
                {/* Point label */}
                <text
                  x={cx}
                  y={cy - 15}
                  textAnchor="middle"
                  className="text-xs font-bold fill-gray-700 bg-white"
                  style={{ 
                    textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white'
                  }}
                >
                  ({point.x}, {point.y})
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {xTicks.map(tick => (
            <text
              key={`x-label-${tick}`}
              x={margin.left + xScale(tick)}
              y={height - margin.bottom + 25}
              textAnchor="middle"
              className="text-sm font-semibold fill-gray-700"
            >
              {tick}
            </text>
          ))}
          
          {/* Y-axis labels */}
          {yTicks.map(tick => (
            <text
              key={`y-label-${tick}`}
              x={margin.left - 25}
              y={margin.top + yScale(tick) + 5}
              textAnchor="middle"
              className="text-sm font-semibold fill-gray-700"
            >
              {tick}
            </text>
          ))}
          
          {/* Axis titles */}
          <text
            x={width / 2}
            y={height - 20}
            textAnchor="middle"
            className="text-lg font-bold fill-gray-800"
          >
            Midterm Score (x)
          </text>
          <text
            x={30}
            y={height / 2}
            textAnchor="middle"
            transform={`rotate(-90 30 ${height / 2})`}
            className="text-lg font-bold fill-gray-800"
          >
            Final Exam Score (y)
          </text>
          
          {/* Chart title */}
          <text
            x={width / 2}
            y={25}
            textAnchor="middle"
            className="text-lg font-bold fill-gray-800"
          >
            Linear Regression Analysis
          </text>
        </svg>
      </div>
      
      {/* Enhanced Legend */}
      <div className="flex justify-center mt-6 space-x-8">
        <div className="flex items-center bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          <div className="w-6 h-6 bg-red-600 rounded-full mr-3 border-2 border-white shadow-sm"></div>
          <span className="text-sm font-semibold text-gray-700">Data Points (x, y)</span>
        </div>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
          <div className="w-6 h-1 bg-blue-600 mr-3 shadow-sm"></div>
          <span className="text-sm font-semibold text-gray-700">Regression Line</span>
        </div>
      </div>
    </div>
  );
}