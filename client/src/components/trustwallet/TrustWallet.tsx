'use client';
import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

const TrustWallet = () => {
	const [account, setAccount] = useState<any>([]);
	const [balance, setBalance] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const changeRoute = () => {
		router.push('/dashboard');
	};

	return (
		<Card title='Trust Wallet'>
			{account.length === 0 ? (
				<h1 className='text-white mb-5'>Please connect your wallet...</h1>
			) : (
				<div className='flex flex-col gap-2.5 mb-5'>
					{loading
						? 'Loading...'
						: account.length > 0 && <p>Wallet Address: {account}</p>}
					{loading ? 'Loading...' : balance !== '' && <p>Balance: {balance}</p>}
				</div>
			)}

			<Button
				text='Connect Wallet'
				buttonClass='p-5 bg-blue-600 rounded-lg hover:scale-105 transition-transform capitalize w-max'
				onClick={() => {
					changeRoute();
				}}
			/>
		</Card>
	);
};

export default TrustWallet;
