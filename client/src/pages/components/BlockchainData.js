import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Contract ABI
import ABI from '../../abi/NFT.json';

export function BlockchainData() {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState('');
  const [signer, setSigner] = useState('');
  const [nftContract, setNftContract] = useState('');

  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);

        await provider.getNetwork();

        const contract = new ethers.Contract(
          '0x5a5fe2dda9a68aec28f4204ade54f245106d0e11',
          ABI,
          signer
        );
        setNftContract(contract);

        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } else {
        window.alert('Please connect Metamask wallet');
      }
    }

    loadBlockchainData();
  }, []);

  return { account, setAccount, provider, signer, nftContract };
}
