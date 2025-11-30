
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useSettings } from '../context/SettingsContext';
import { formatCurrency } from '../utils/localization';

interface Props {
  total: number;
  spent: number;
}

const BudgetChart: React.FC<Props> = ({ total, spent }) => {
  const { currency } = useSettings();
  const remaining = Math.max(0, total - spent);
  const data = [
    { name: 'Spent', value: spent },
    { name: 'Remaining', value: remaining },
  ];
  const COLORS = ['#F97316', '#10B981'];

  const percentage = total > 0 ? Math.round((spent / total) * 100) : 0;

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="text-center pb-8">
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Utilized</p>
            <p className="text-2xl font-bold text-gray-800">{percentage}%</p>
        </div>
      </div>
      
      <div className="w-full h-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value, currency)}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetChart;
