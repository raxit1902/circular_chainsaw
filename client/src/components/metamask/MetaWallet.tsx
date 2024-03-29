'use client';
import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

const MetaWallet = () => {
	const [account, setAccount] = useState<any>([]);
	const [balance, setBalance] = useState<string>('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// const requestAccount = async () => {
	// 	if (typeof window?.ethereum !== 'undefined') {
	// 		setLoading(true);
	// 		try {
	// 			const accounts = await window?.ethereum.request({
	// 				method: 'eth_requestAccounts',
	// 			});
	// 			setAccount(accounts[0]);
	// 			localStorage.setItem('accountAddress', JSON.stringify(accounts[0]));
	// 			setLoading(false);
	// 		} catch {
	// 			console.log('console_error_connecting');
	// 		}
	// 	} else {
	// 		alert('Meta mask is not available');
	// 	}
	// };

	// const requestConnection = async () => {
	// 	requestAccount();
	// 	setLoading(true);
	// 	if (typeof window !== 'undefined') {
	// 		const address = JSON.parse(localStorage.getItem('accountAddress'));
	// 		try {
	// 			const balance = await window.ethereum.request({
	// 				method: 'eth_getBalance',
	// 				params: [address, 'latest'],
	// 			});
	// 			const formattedBalance = ethers.formatEther(balance);
	// 			setBalance(formattedBalance);
	// 			setLoading(false);
	// 			router.push('/dashboard');
	// 		} catch {
	// 			console.log('console_error_getting Balance');
	// 		}
	// 	} else {
	// 		alert('Ethereum is not available');
	// 	}
	// };

	const changeRoute = () => {
		router.push('/dashboard');
	};

	return (
		<>
			<Card title='Meta Wallet'>
				{account.length === 0 ? (
					<h1 className='text-white mb-5'>Please connect your wallet...</h1>
				) : (
					<div className='flex flex-col gap-2.5 mb-5'>
						{loading
							? 'Loading...'
							: account.length > 0 && <p>Wallet Address: {account}</p>}
						{loading
							? 'Loading...'
							: balance !== '' && <p>Balance: {balance}</p>}
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
		</>
	);
};

export default MetaWallet;
