import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export const projectId = 'e75168a56119ae203d825f513e3aa644';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
	name: 'Web3Modal',
	description: 'Web3Modal Example',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
	url: '',
};

export const wagmiConfig = defaultWagmiConfig({
	chains: [mainnet, sepolia],
	projectId,
	metadata,
	ssr: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
	enableWalletConnect: true,
	enableInjected: true,
	enableEIP6963: true,
	enableCoinbase: true,
});
