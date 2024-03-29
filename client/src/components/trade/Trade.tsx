import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Vector from '../../../public/images/Bitcoin-Vector.png';
import Button from '@/components/common/Button';
import { Backdrop } from '@mui/material';
import SendTransaction from '@/components/SendTransaction/Wrapper';
import Icons from '@/components/common/Icons';
import { sendAbi } from '@/utils/utils';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useForm } from 'react-hook-form';

const Trade = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState<string>('');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [mood, setMood] = useState<string>('');

  const handleSellRequest = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const contractAddress = '0xD819099b9505ACCB139C5eFBfe5FBcE5C4E992B0';
  const web3ModalRef = useRef<any>();

  const getProviderOrSigner = async (needSigner: boolean = false) => {
    setConnecting(true);
    try {
      const provider = await web3ModalRef.current?.connect();
      const web3Provider = new ethers.BrowserProvider(provider);
      let { chainId } = await web3Provider.getNetwork();
      const signer = await web3Provider.getSigner();
      const _address = await signer.getAddress();
      setAddress(_address);
      if (needSigner) {
        return signer;
      }
      return web3Provider;
    } catch {}
  };

  const onChangeMood = async (data: any) => {
    const str = data.buyValue;
    try {
      const providerOrSigner = await getProviderOrSigner(true);
      const contract = new ethers.Contract(
        contractAddress,
        sendAbi,
        providerOrSigner
      );
      const tx = await contract.setAmount(str);
      setTransactionStatus('Transaction processing ....');
      await tx.wait();
      setMood(str);
      setTransactionStatus(
        'Transaction confirmed,' + str + ' ' + 'Balance updated'
      );
    } catch {}
  };

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: 'sepolia',
      providerOptions: {},
      disableInjectedProvider: false,
    });
  }, []);

  return (
    <section id='Trade'>
      <div className='mt-36 mb-28 py-[170px] bg-[#F3F7F9] px-28 pb-[200px] flex justify-center items-center'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center justify-center gap-28'>
            <Image src={Vector} height={500} width={500} alt='Vector' />
            <div className='flex flex-col gap-5'>
              <h1 className='text-4xl text-[#20509e]'>What is Ethereum</h1>
              <h1 className='text-[#20509e] text-lg'>
                Ethereum is a decentralized network for apps and transactions,
                cutting out the middleman.
              </h1>
              <h1 className='text-gray-700 text-md'>
                Ethereum is like a global computer network where people can
                interact directly with each other and with applications without
                relying on traditional centralized systems. <br /> It is a
                platform that enables users to access a wide range of
                decentralized services.
              </h1>
              {/* <div className='flex flex-col gap-5'>
								<form onSubmit={handleSubmit(onChangeMood)}>
									<div className='flex gap-5'>
										<input type='text' {...register('buyValue')} />
										<Button
											text='Buy'
											buttonClass='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold text-[#20509E py-3 px-10 rounded-full hover:scale-110'
											type='submit'
										/>
									</div>
									{transactionStatus && <p> {transactionStatus} </p>}
								</form>
								<div>
									<Button
										text='Transfer'
										buttonClass='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold text-[#20509E py-3 px-10 rounded-full hover:scale-110'
										onClick={() => {
											handleSellRequest();
										}}
									/>
								</div>
							</div> */}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <>
          <Backdrop open={open}>
            <div
              className='fixed top-20 right-20 cursor-pointer'
              onClick={handleClose}
            >
              <Icons iconName='akar-icons:cross' width={30} color='white' />
            </div>
            <SendTransaction />
          </Backdrop>
        </>
      )}
    </section>
  );
};

export default Trade;
