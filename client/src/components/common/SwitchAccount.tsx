import React from 'react';
import { ButtonProps } from '@/Interfaces';

const SwitchAccount: React.FC<ButtonProps> = ({
	onClick,
	text,
	buttonClass,
}) => {
	return (
		<button
			onClick={onClick}
			className={`capitalize font-bold p-4 rounded-full hover:scale-110 hover:drop-shadow-lg transition-transform ${buttonClass}`}>
			{text}
		</button>
	);
};

export default SwitchAccount;
