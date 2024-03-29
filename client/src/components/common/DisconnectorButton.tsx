import { ButtonProps } from '@/Interfaces';
import React from 'react';

const DisconnectorButton: React.FC<ButtonProps> = ({
	onClick,
	text,
	buttonClass,
}) => {
	return (
		<button
			className={`disconnect-btn rounded-full font-bold p-4 hover:scale-110 hover:drop-shadow-lg transition-transform border ${buttonClass}`}
			id='disconnectButton'
			onClick={onClick}>
			{text}
		</button>
	);
};

export default DisconnectorButton;
