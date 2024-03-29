'use client';
import ConnectorButton from '@/components/common/ConnectorButton';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [warning, setWarning] = useState<string>();

  const w3m = useWeb3Modal();
  const { address } = useAccount();
  const router = useRouter();

  const handleConnectionRequest = () => {
    w3m.open();
    address !== undefined && setWalletAddress(address);
  };

  useEffect(() => {
    address !== undefined ? router.push('/dashboard') : router.push('/');
  }, [address, walletAddress, warning, router]);

  return (
    <>
      <div className='flex items-center justify-center h-screen' id='hero'>
        <div className='flex flex-col items-center gap-20'>
          <div className='text-white flex items-center flex-col gap-5'>
            <h1
              className='text-[55px] text-center font-bold leading-tight drop-shadow-lg'
              id='hero-text'
            >
              Step into the world of <br />
              secure transactions.
            </h1>
            <h1 className='drop-shadow-md text-gray-900'>
              Your journey begins here &rarr;
            </h1>
            <div className='m-5'>
              <ConnectorButton
                onClick={() => {
                  handleConnectionRequest();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
