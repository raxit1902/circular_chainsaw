import React, { useState } from 'react';
import Image from 'next/image';
import Vector from '../../../../public/images/Bitcoin-Vector.png';
import Button from '@/components/common/Button';
import SendTransaction from '@/components/SendTransaction/Wrapper';
import Icons from '@/components/common/Icons';
import { Modal, Box } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

const WalletToWalletTransfer = () => {
  const [open, setOpen] = useState(false);

  const handleSellRequest = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <section id='wallet-to-wallet'>
      <div className='mt-36 mb-28 py-[170px] bg-[#F3F7F9] px-28 pb-[200px] flex justify-center items-center'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center justify-center gap-28'>
            <Image src={Vector} height={500} width={500} alt='Vector' />
            <div className='flex flex-col gap-5'>
              <h1 className='text-4xl text-[#20509e]'>
                What is wallet-to-wallet
              </h1>
              {/* <h1 className='text-[#20509e] text-lg'>
                A wallet-to-wallet transfer refers to the process of sending
                funds directly from one digital wallet to another.
              </h1> */}
              <h1 className='text-gray-700 text-md'>
                A wallet-to-wallet transfer is the direct movement of funds from
                one digital wallet to another, commonly used in cryptocurrency
                transactions for its speed, cost-effectiveness, and
                decentralized nature. It eliminates intermediaries like banks,
                offering increased privacy and security.
              </h1>
              <div className='flex flex-col gap-5'>
                <div>
                  <Button
                    text='Wallet To Wallet Transfer'
                    buttonClass='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold text-[#20509E py-3 px-10 rounded-full hover:scale-110'
                    onClick={() => {
                      handleSellRequest();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div
                className='cursor-pointer flex justify-between items-center pb-2.5 mb-4 border-b border-[#777E90] border-solid'
                onClick={handleClose}
              >
                <p className='text-xl font-bold'>Wallet To Wallet Transfer</p>
                <Icons iconName='akar-icons:cross' width={20} color='black' />
              </div>
              <SendTransaction />
            </Box>
          </Modal>
        </>
      )}
    </section>
  );
};

export default WalletToWalletTransfer;
