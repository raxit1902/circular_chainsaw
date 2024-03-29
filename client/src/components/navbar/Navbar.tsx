'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../../public/images/logo.png';
import Button from '../common/Button';
import DisconnectorButton from '../common/DisconnectorButton';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Link from 'next/link';
import SwitchAccount from '../common/SwitchAccount';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const { address, isDisconnected } = useAccount();
  const [navbar, setNavbar] = useState<boolean>(false);
  const w3m = useWeb3Modal();
  const disconnect = useDisconnect();
  const connectorText = isDisconnected ? 'Connect Wallet' : 'Switch Wallet';

  const handleDisconnectRequest = () => {
    disconnect.disconnect();
  };

  const handleSwitchRequest = () => {
    w3m.open();
  };

  const handleNavbar = () => {
    scrollY >= 200 ? setNavbar(true) : setNavbar(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleNavbar);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <nav className={`${navbar ? 'navbar active' : 'navbar'} sticky top-0`}> */}
      <nav className={`bg-white sticky top-0 shadow-lg`}>
        <div className='flex justify-center items-center bg-none p-5 sticky top-0'>
          <div className='flex justify-between items-center w-full bg-none'>
            <Link href='#Dashboard'>
              <div className='flex flex-col items-center justify-center w-max'>
                <Image src={Logo} height={100} width={100} alt='Logo' />
              </div>
            </Link>
            <div className='flex gap-2.5'>
              <Link href=''>
                <Button
                  text='Transfer'
                  buttonClass={`text-[#194489] rounded-full font-bold p-4 hover:scale-110 hover:drop-shadow-lg transition-transform`}
                  //   buttonClass={`${
                  //     navbar ? 'text-[#194489]' : 'text-white'
                  //   } rounded-full font-bold p-4 hover:scale-110 hover:drop-shadow-lg transition-transform`}
                  onClick={handleClick}
                />
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href='#wallet-to-wallet'>Wallet to Wallet</Link>
                  </MenuItem>
                </Menu>
              </Link>
              <Link href={'#transaction-history'}>
                <Button
                  text='Transaction History'
                  buttonClass={`text-[#194489] rounded-full font-bold p-4 hover:scale-110 hover:drop-shadow-lg transition-transform`}
                />
              </Link>
              <Link href={'#price-tracker'}>
                <Button
                  text='Pricelist'
                  buttonClass={`text-[#194489] rounded-full font-bold p-4 hover:scale-110 hover:drop-shadow-lg transition-transform`}
                />
              </Link>
              <SwitchAccount
                onClick={() => {
                  handleSwitchRequest();
                }}
                buttonClass={`text-[#194489]`}
                text={connectorText}
              />
              {address !== undefined && (
                <div>
                  <DisconnectorButton
                    onClick={() => {
                      handleDisconnectRequest();
                    }}
                    buttonClass={`text-[#194489] border-[#194489]`}
                    text='Disconnect Wallet'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
