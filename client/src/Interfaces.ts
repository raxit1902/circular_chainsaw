// declare global {
//   interface Window {
//     ethereum?: unknown | any;
//   }
// }

export interface ButtonProps {
  text?: string;
  buttonClass?: string;
  type?: string;
  onClick?: any;
  disabled?: any;
}

export interface PageProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CardProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  titleButton?: any;
}

export interface IconProps {
  width?: number;
  rotate?: number;
  hFlip?: boolean;
  iconName?: any;
  className?: string;
  color?: string;
  vFlip?: boolean;
}

export interface PopupProps {
  isOpen?: boolean;
  close?: () => void;
  children?: React.ReactNode;
}
