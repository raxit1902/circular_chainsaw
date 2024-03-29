import React from 'react';
import { CardProps } from '@/Interfaces';

const Card: React.FC<CardProps> = ({
  title,
  children,
  titleButton,
  className,
}) => {
  return (
    <div className={`p-5 rounded-lg flex flex-col gap-5 ${className}`}>
      <div className='flex justify-between'>
        <h1 className='text-gray-700 text-3xl font-bold'>{title}</h1>
        {titleButton ? <div>{titleButton}</div> : null}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
