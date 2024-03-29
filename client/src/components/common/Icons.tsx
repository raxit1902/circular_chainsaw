import React from 'react';
import { Icon } from '@iconify/react';
import { IconProps } from '@/Interfaces';

const Icons: React.FC<IconProps> = ({
  iconName,
  className,
  width,
  rotate,
  hFlip,
  vFlip,
  color,
}) => {
  return (
    <>
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={iconName}
        className={className}
        vFlip={vFlip}
        color={color}
      />
    </>
  );
};

export default Icons;
