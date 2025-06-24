import React from 'react';
import { DataPoint } from '../types';

interface DataTableProps {
  dataPoints: DataPoint[];
  intercept: number;
  slope: number;
}

export function DataTable({ dataPoints, intercept, slope }: DataTableProps) {
  const totals = dataPoints.reduce(
    (acc, point) => ({
      x: acc.x + point.x,
      y: acc.y + point.y,
      xSquared: acc.xSquared + point.xSquared,
      xy: acc.xy + point.xy
    }),
    { x: 0, y: 0, xSquared: 0, xy: 0 }
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Analysis Table</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">x (Midterm)</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">y (Final)</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">x²</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">x·y</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">ŷ = a + bx</th>
            </tr>
          </thead>
          <tbody>
            {dataPoints.map((point, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-700">{index + 1}</td>
                <td className="text-right py-3 px-4 text-gray-600">{point.x}</td>
                <td className="text-right py-3 px-4 text-gray-600">{point.y}</td>
                <td className="text-right py-3 px-4 text-gray-600">{point.xSquared}</td>
                <td className="text-right py-3 px-4 text-gray-600">{point.xy}</td>
                <td className="text-left py-3 px-4 text-blue-600 font-mono text-xs">
                  ŷ = {intercept.toFixed(4)} + {slope.toFixed(4)}×{point.x} = {point.yPredicted.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
              <td className="py-3 px-4 text-gray-800">Totals</td>
              <td className="text-right py-3 px-4 text-gray-800">{totals.x}</td>
              <td className="text-right py-3 px-4 text-gray-800">{totals.y}</td>
              <td className="text-right py-3 px-4 text-gray-800">{totals.xSquared}</td>
              <td className="text-right py-3 px-4 text-gray-800">{totals.xy}</td>
              <td className="text-left py-3 px-4 text-gray-400">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}