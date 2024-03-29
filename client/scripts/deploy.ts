import { ethers } from 'hardhat';

async function main() {
	const [deployer] = await ethers.getSigners();
	console.log('Deploying contract with account : ', deployer.address);
	const ReceiveEtherContract = await ethers.deployContract('ReceiveEther');
	const SendEtherContract = await ethers.deployContract('SendEther');
	const receiveEtherAddress = await ReceiveEtherContract.getAddress();
	const sendEtherAddress = await SendEtherContract.getAddress();
	console.log(
		'The send contract has been deployed to address:',
		receiveEtherAddress,
	);
	console.log(
		'The receive contract has been deployed to address:',
		sendEtherAddress,
	);
}
main()
	.then(() => {
		console.log('console_Successfully deployed Contract');
		process.exit(0);
	})
	.catch((err) => {
		console.log('console_error', err);
		process.exit(1);
	});
