import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const PriceTracker = () => {
  const [coinsData, setCoinsData] = useState<any>([]);

  useEffect(() => {
    socket.on('coin-update', (data: any) => {
      console.log('Received Data:', data);
      setCoinsData(data);
    });

    return () => {
      socket.off('coin-update');
    };
  }, []);

  return (
    <>
      <section id='price-tracker'>
        <Card className='pl-0 mx-28'>
          <h1 className='pt-[90px] text-3xl font-bold text-center'>
            Pricelist
          </h1>
          <table className='rounded-xl mt-8 w-full'>
            {coinsData.length > 0 && (
              <thead className='bg-color text-white'>
                <tr>
                  <td className='p-5 rounded-l-lg'>
                    <th>Coin</th>
                  </td>
                  <td className='p-5'>
                    <th>Price</th>
                  </td>
                  <td className='p-5'>
                    <th>Market Cap</th>
                  </td>
                  <td className='p-5 '>
                    <th>Market Cap Rank</th>
                  </td>
                  <td className='p-5 rounded-r-lg'>
                    <th>Last 7 Days</th>
                  </td>
                </tr>
              </thead>
            )}
            {coinsData.length > 0 &&
              coinsData?.map((coin: any) => (
                <>
                  <tbody key={coin.item.id}>
                    <tr>
                      <td className='px-5 py-2.5 shadow-lg'>
                        <div className='flex gap-5 items-center'>
                          <img src={coin.item.small} alt='Coin' />
                          <p className='text-gray-900'>{coin.item.symbol}</p>
                        </div>
                      </td>
                      <td className='px-5 py-2.5 shadow-lg'>
                        <p className='text-gray-900'>
                          {'$' + ' ' + `${coin.item.data.price}`}
                        </p>
                      </td>
                      <td className='px-5 py-2.5 shadow-lg'>
                        <p className='text-gray-900'>
                          {coin.item.data.market_cap}
                        </p>
                      </td>
                      <td className='px-5 py-2.5 shadow-lg'>
                        <p className='text-gray-900'>
                          {coin.item.market_cap_rank}
                        </p>
                      </td>
                      <td className='px-5 py-2.5 shadow-lg'>
                        <img src={coin.item.data.sparkline} alt='Sparkline' />
                      </td>
                    </tr>
                  </tbody>
                </>
              ))}
          </table>
        </Card>
      </section>
    </>
  );
};

export default PriceTracker;
