import React from 'react';
import { ButtonProps } from '@/Interfaces';

const ConnectorButton: React.FC<ButtonProps> = ({ onClick }) => {
	return (
		<button
			className='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold p-4 rounded-full hover:scale-110 hover:drop-shadow-lg transition-transform'
			onClick={onClick}>
			Connect wallet
		</button>
	);
};

export default ConnectorButton;
