import React from 'react';
import { PageProps } from '@/Interfaces';

const Page: React.FC<PageProps> = ({ children, className }) => {
  return (
    <div className={`${className}`}>
      <div>{children}</div>
    </div>
  );
};

export default Page;
