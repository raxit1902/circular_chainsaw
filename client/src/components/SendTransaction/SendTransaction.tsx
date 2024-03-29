import React from 'react';
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';

const SendTransaction = () => {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as `0x${string}`;
    const value = formData.get('value') as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit} className='flex flex-col gap-5'>
      {/* className='flex flex-col gap-5 border border-solid bg-white shadow-gray-700 shadow-2xl p-5 rounded-xl mt-5'> */}
      <div className='flex flex-col gap-5'>
        <div>
          <label className='text-sm text-[#777E90]'>Wallet Address</label>
          <input
            name='address'
            placeholder='Wallet Address'
            required
            className='w-full p-2.5 rounded-lg outline-none text-white bg-gray-500 placeholder:text-gray-200'
          />
        </div>
        <div>
          <label className='text-sm text-[#777E90]'>Amount</label>
          <input
            name='value'
            placeholder='0.05'
            required
            className='w-full p-2.5 rounded-lg outline-none text-white bg-gray-500 placeholder:text-gray-200'
          />
        </div>
        <button
          type='submit'
          disabled={isPending}
          className='text-white bg-gradient-to-br from-[#244AF3] to-[#09d288] font-bold p-4 rounded-full hover:scale-110 hover:drop-shadow-lg transition-transform'
        >
          {isPending ? 'Confirming...' : 'Send'}
        </button>
      </div>
      {hash && <div className='text-white'>Transaction Hash: {hash}</div>}
      {isConfirming && (
        <div className='text-white'>Waiting for confirmation...</div>
      )}
      {isConfirmed && <div className='text-white'>Transaction confirmed.</div>}
      {error && (
        <div className='text-white'>
          Error: {(error as BaseError).shortMessage || error.message}
        </div>
      )}
    </form>
  );
};

export default SendTransaction;
