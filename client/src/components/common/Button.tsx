import React from 'react';
import { ButtonProps } from '@/Interfaces';

const Button: React.FC<ButtonProps> = ({ text, buttonClass, onClick }) => {
	return (
		<button className={`${buttonClass}`} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
