'use client';
import React, { useState, useEffect } from 'react';
import Card from '@/components/common/Card';
import { ethers } from 'ethers';
import { Web3 } from 'web3';
import { abi } from '@/utils/utils';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter } from 'next/navigation';
import TransactionHistory from '../transaction-history/TransactionHistory';
import Trade from '../trade/Trade';
import PriceTracker from '@/components/pricetracker/PriceTracker';
import WalletToWalletTransfer from '@/components/Transfer/WalletToWallet/Wrapper';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { address, isDisconnected } = useAccount();
  const [currentBalance, setCurrentBalance] = useState<any>('');
  const w3m = useWeb3Modal();
  const disconnect = useDisconnect();
  const router = useRouter();
  const connectorText = isDisconnected ? 'Connect Wallet' : 'Switch Wallet';
  const [web3, setWeb3] = useState<any>(null);
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [contract, setContract] = useState<any>(null);
  const [updateBalance, setUpdateBalance] = useState<any>({
    status: '',
  });
  const [transactionData, setTransactionData] = useState<any>([]);

  const result = useBalance({
    address: address,
  });

  useEffect(() => {
    if (result.data !== undefined) {
      console.log(result.data);
      const amount = result.data?.value;
      const amountString = amount !== undefined && amount?.toString();
      // const balanceAmount = ethers.BigNumber.from(amountString);
      // setCurrentBalance(result.data?.value);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const connect = async () => {
        const web3: any = new Web3(window.ethereum);
        setWeb3(web3);

        connectWallet(web3);

        const instance = new web3.eth.Contract(abi, account);
        setContract(instance);
      };
      if (window.ethereum) {
        connect();
      }
    }
  }, []);

  const cardData = [
    {
      icon: 'logos:bitcoin',
      width: 40,
    },
  ];

  const connectWallet = async (web3: any) => {
    if (typeof window !== undefined) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      walletBalance(accounts[0], web3);
    }
  };

  const walletBalance = (accounts: any, web3: any) => {
    web3.eth
      .getBalance(accounts)
      .then((res: any) => setBalance(ethers.formatEther(res)));
  };

  const handleClick = async () => {
    if (!contract) return;
    setUpdateBalance({ ...setUpdateBalance, status: 'pending' });
    try {
      await contract.methods
        .sendTransaction()
        .send({ from: window.ethereum.selectedAddress });
      const balance = await window?.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      const formattedBalance = ethers.formatEther(balance);
      setBalance(formattedBalance);
      formattedBalance !== undefined &&
        setUpdateBalance({
          ...setUpdateBalance,
          status: 'done',
        });
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  const handleTransactionHistory = async () => {
    try {
      const txData = await fetch(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x1b19F78A48A91994BEF15eB1eB1b2830feB4465f&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=IXBZQ1JCBZDF1XJBWKFPIEC7D2WC47C1ZI'
      );
      if (!txData.ok) {
        throw new Error(
          `Network response was not ok, status: ${txData.status}`
        );
      }
      const jsonData = await txData.json();

      setTransactionData(jsonData.result);
    } catch (error) {
      console.error('Failed to fetch transaction data:', error);
    }
  };

  const handleSellRequest = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    address === undefined && router.push('/');
  }, [address, router]);

  useEffect(() => {
    handleTransactionHistory();
  }, []);

  return (
    <>
      <Card className='bg-img'>
        <div className='mx-28 flex flex-col gap-2.5 justify-center items-start pb-[295px] pt-28'>
          <div className='w-max'>
            {account.length === 0 ? (
              <h1 className='text-[#20509e] font-semibold mb-5'>Loading...</h1>
            ) : (
              <div className='flex flex-col gap-5 mb-5'>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    <div className='font-semibold text-[#20509E] text-5xl flex flex-col gap-5'></div>

                    <p className='font-semibold text-[#20509E] text-4xl flex gap-2'>
                      Wallet Address:
                      <span className='text-gray-700 block max-w-80 cursor-pointer overflow-hidden text-ellipsis'>
                        {address}
                      </span>
                    </p>
                  </>
                )}
                {loading && balance == ''
                  ? 'Loading...'
                  : balance &&
                    balance !== '' && (
                      <p className='font-semibold text-[#20509E] text-4xl flex gap-2'>
                        Balance:{' '}
                        <span className='text-gray-700'>{balance}</span>
                      </p>
                    )}
              </div>
            )}
          </div>
          {/* <div
					className={`${
						account.length === 0 ? `hidden` : `block`
					}`}>
					{cardData.map((card, index) => (
						<div
							key={index}
							className={`mt-5 shadow-gray-500 shadow-2xl border-gray-500 p-5 flex flex-col justify-between items-center ${
								updateBalance.status === 'done'
									? 'bg-green-500'
									: 'bg-transparent'
							}`}>
							<div className='flex justify-center items-center'>
								<Icons iconName={card.icon} width={card.width} />
							</div>
							<div className='flex justify-between w-full pt-2.5'>
								<Button
									key={index}
									text={`${
										updateBalance.status === 'pending'
											? 'processing...'
											: updateBalance.status === 'done'
											? 'Done'
											: 'Buy'
									}`}
									buttonClass='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold text-[#20509E py-3 px <br /><span>5 ro className='text-[#16D0C5]'unded-full </span> hover:scale-110 hover:drop-shadow-lg transition-transform'
									onClick={handleClick}
								/>
								<Button
									key={index}
									text='Sell'
									buttonClass='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold text-[#20509E py-3 px-5 rounded-full hover:scale-110 <br /><span> hove className='text-[#16D0C5]'r:drop </span>-shadow-lg transition-transform'
									onClick={() => {
										handleSellRequest();
									}}
								/>
							</div>
						</div>
					))}
				</div> */}
        </div>
        {/* {open && (
				<>
					<Backdrop open={open}>
						<div
							className='fixed top-20 right-20 cursor-pointer'
							onClick={handleClose}>
							<Icons iconName='akar-icons:cross' width={30} color='white' />
						</div>
						<SendTransaction />
					</Backdrop>
				</>
			)} */}
      </Card>
      <Trade />
      <TransactionHistory />
      <PriceTracker />
      <WalletToWalletTransfer />
    </>
  );
};

export default Dashboard;
