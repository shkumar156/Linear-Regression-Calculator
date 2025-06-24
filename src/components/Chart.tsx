import React, { useEffect, useState } from 'react';
import { ChartData } from '../types';

interface ChartProps {
  data: ChartData;
  width?: number;
  height?: number;
}

export function Chart({ data, width = 800, height = 500 }: ChartProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({ width, height });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // Mobile dimensions - use more of the screen width
        const mobileWidth = Math.min(window.innerWidth - 16, 500); // 16px for padding
        const mobileHeight = Math.min(mobileWidth * 0.8, 350);
        setChartDimensions({ width: mobileWidth, height: mobileHeight });
      } else {
        // Desktop dimensions
        setChartDimensions({ width, height });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [width, height]);

  // Responsive margins - adjusted for better mobile display
  const margin = isMobile 
    ? { top: 25, right: 25, bottom: 50, left: 50 }
    : { top: 40, right: 40, bottom: 80, left: 80 };
  
  const chartWidth = chartDimensions.width - margin.left - margin.right;
  const chartHeight = chartDimensions.height - margin.top - margin.bottom;
  
  const xRange = data.maxX - data.minX;
  const yRange = data.maxY - data.minY;
  const xPadding = xRange * 0.1;
  const yPadding = yRange * 0.1;
  
  const xScale = (x: number) => ((x - data.minX + xPadding) / (xRange + 2 * xPadding)) * chartWidth;
  const yScale = (y: number) => chartHeight - ((y - data.minY + yPadding) / (yRange + 2 * yPadding)) * chartHeight;
  
  // Generate tick marks (fewer on mobile)
  const tickCount = isMobile ? 5 : 8;
  const xTicks = Array.from({ length: tickCount }, (_, i) => 
    Math.round(data.minX + (i * xRange) / (tickCount - 1))
  );
  const yTicks = Array.from({ length: tickCount }, (_, i) => 
    Math.round(data.minY + (i * yRange) / (tickCount - 1))
  );

  return (
    <div className="bg-white p-2 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-base sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-6 text-center">
        📊 Scatter Plot with Linear Regression Line
      </h3>
      <div className="flex justify-center overflow-x-auto">
        <svg 
          width={chartDimensions.width} 
          height={chartDimensions.height} 
          className="border-2 border-gray-300 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-purple-50"
          style={{ minWidth: '280px' }}
          viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
        >
          {/* Background grid */}
          {xTicks.map(tick => (
            <line
              key={`x-grid-${tick}`}
              x1={margin.left + xScale(tick)}
              y1={margin.top}
              x2={margin.left + xScale(tick)}
              y2={chartDimensions.height - margin.bottom}
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
              x2={chartDimensions.width - margin.right}
              y2={margin.top + yScale(tick)}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}
          
          {/* Main axes */}
          <line
            x1={margin.left}
            y1={chartDimensions.height - margin.bottom}
            x2={chartDimensions.width - margin.right}
            y2={chartDimensions.height - margin.bottom}
            stroke="#1f2937"
            strokeWidth="3"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={chartDimensions.height - margin.bottom}
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
            const pointRadius = isMobile ? 5 : 8;
            return (
              <g key={i}>
                {/* Point circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={pointRadius}
                  fill="#dc2626"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="drop-shadow-lg hover:r-10 transition-all duration-200 cursor-pointer"
                />
                {/* Point label - show on both mobile and desktop with different sizes */}
                <text
                  x={cx}
                  y={cy - (isMobile ? 10 : 15)}
                  textAnchor="middle"
                  className={`${isMobile ? 'text-[8px]' : 'text-xs'} font-bold fill-gray-700`}
                  style={{ 
                    textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white'
                  }}
                >
                  {isMobile ? `${point.x},${point.y}` : `(${point.x}, ${point.y})`}
                </text>
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {xTicks.map(tick => (
            <text
              key={`x-label-${tick}`}
              x={margin.left + xScale(tick)}
              y={chartDimensions.height - margin.bottom + (isMobile ? 20 : 25)}
              textAnchor="middle"
              className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-semibold fill-gray-700`}
            >
              {tick}
            </text>
          ))}
          
          {/* Y-axis labels */}
          {yTicks.map(tick => (
            <text
              key={`y-label-${tick}`}
              x={margin.left - (isMobile ? 20 : 25)}
              y={margin.top + yScale(tick) + 5}
              textAnchor="middle"
              className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-semibold fill-gray-700`}
            >
              {tick}
            </text>
          ))}
          
          {/* Axis titles */}
          <text
            x={chartDimensions.width / 2}
            y={chartDimensions.height - (isMobile ? 15 : 20)}
            textAnchor="middle"
            className={`${isMobile ? 'text-xs' : 'text-lg'} font-bold fill-gray-800`}
          >
            {isMobile ? 'Midterm (x)' : 'Midterm Score (x)'}
          </text>
          <text
            x={isMobile ? 25 : 30}
            y={chartDimensions.height / 2}
            textAnchor="middle"
            transform={`rotate(-90 ${isMobile ? 25 : 30} ${chartDimensions.height / 2})`}
            className={`${isMobile ? 'text-xs' : 'text-lg'} font-bold fill-gray-800`}
          >
            {isMobile ? 'Final (y)' : 'Final Exam Score (y)'}
          </text>
          
          {/* Chart title */}
          <text
            x={chartDimensions.width / 2}
            y={isMobile ? 18 : 25}
            textAnchor="middle"
            className={`${isMobile ? 'text-xs' : 'text-lg'} font-bold fill-gray-800`}
          >
            {isMobile ? 'Linear Regression' : 'Linear Regression Analysis'}
          </text>
        </svg>
      </div>
      
      {/* Enhanced Legend - responsive layout */}
      <div className="flex flex-col sm:flex-row justify-center mt-3 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-8">
        <div className="flex items-center justify-center bg-red-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-red-200">
          <div className="w-3 h-3 sm:w-6 sm:h-6 bg-red-600 rounded-full mr-2 sm:mr-3 border-2 border-white shadow-sm"></div>
          <span className="text-[10px] sm:text-sm font-semibold text-gray-700">
            {isMobile ? 'Data Points' : 'Data Points (x, y)'}
          </span>
        </div>
        <div className="flex items-center justify-center bg-blue-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg border border-blue-200">
          <div className="w-3 h-1 sm:w-6 sm:h-1 bg-blue-600 mr-2 sm:mr-3 shadow-sm"></div>
          <span className="text-[10px] sm:text-sm font-semibold text-gray-700">
            {isMobile ? 'Regression' : 'Regression Line'}
          </span>
        </div>
      </div>
    </div>
  );
}