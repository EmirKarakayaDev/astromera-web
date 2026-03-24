import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '12px', className = '' }) => {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ 
        width, 
        height, 
        borderRadius 
      }} 
    />
  );
};

export default Skeleton;
