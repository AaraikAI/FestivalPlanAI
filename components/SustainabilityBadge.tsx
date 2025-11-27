import React from 'react';

interface Props {
  score: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
}

const SustainabilityBadge: React.FC<Props> = ({ score, size = 'md' }) => {
  let colorClass = 'bg-red-100 text-red-800';
  if (score >= 80) colorClass = 'bg-green-100 text-green-800';
  else if (score >= 50) colorClass = 'bg-yellow-100 text-yellow-800';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className={`inline-flex items-center rounded-full font-medium ${colorClass} ${sizeClasses[size]}`}>
      <span className="mr-1">🌱</span>
      Eco Score: {score}
    </div>
  );
};

export default SustainabilityBadge;
