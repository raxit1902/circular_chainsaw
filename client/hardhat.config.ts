import '@nomicfoundation/hardhat-ethers';

module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/khfQM-pXaEj399CEM3cCOa09T5-Cxg3z',
      accounts: [
        'a02f8002707ef77001ad6a4e6cad27bce2ceebe26e91b9f5609774d3f8e7fc28',
      ],
    },
  },
};
