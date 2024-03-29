import React, { useState, useEffect } from 'react';

const TransactionHistory = () => {
  const [transactionData, setTransactionData] = useState<any>([]);

  const handleTransactionHistory = async () => {
    try {
      const txData = await fetch(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x5B0AE7e894171c310BE5A28b7BCe9A12bEEea94d&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=F39BUSYUF3295A1F2KMTESCSVRRTTEEPB3'
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

  useEffect(() => {
    handleTransactionHistory();
  }, []);

  return (
    <section id='transaction-history'>
      <div className='mx-28'>
        <h1 className='pt-[90px] text-3xl font-bold text-center'>
          Transaction History
        </h1>
        <table className='rounded-xl mt-8 w-full'>
          {transactionData?.length > 0 && (
            <thead className='bg-color text-white'>
              <tr>
                <td className='p-5 rounded-l-lg'>
                  <th>Blocknumber</th>
                </td>
                <td className='p-5'>
                  <th>Timestamp</th>
                </td>
                <td className='p-5'>
                  <th>Hash</th>
                </td>
                <td className='p-5'>
                  <th>Nonce</th>
                </td>
                <td className='p-5 rounded-r-lg'>
                  <th>Blockhash</th>
                </td>
              </tr>
            </thead>
          )}
          {transactionData?.length > 0 &&
            transactionData?.map((data: any, index: number) => (
              <>
                <tbody key={index}>
                  <tr>
                    <td className='px-5 py-2.5 shadow-lg'>
                      <p className='text-gray-900'>{data.blockNumber}</p>
                    </td>
                    <td className='px-5 py-2.5 shadow-lg'>
                      <p className='text-gray-900'>{data.timeStamp}</p>
                    </td>
                    <td className='px-5 py-2.5 shadow-lg'>
                      <p className='text-gray-900 block max-w-40 overflow-hidden text-ellipsis'>
                        {data.hash}
                      </p>
                    </td>
                    <td className='px-5 py-2.5 shadow-lg'>
                      <p className='text-gray-900'>{data.nonce}</p>
                    </td>
                    <td className='px-5 py-2.5 shadow-lg'>
                      <p className='text-gray-900 block max-w-40 overflow-hidden text-ellipsis'>
                        {data.blockHash}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
        </table>
      </div>
    </section>
  );
};

export default TransactionHistory;
