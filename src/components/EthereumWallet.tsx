import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import React from "react";

const EthereumWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [addresses, setAddresses] = React.useState<string[]>([]);

  const createWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${addresses.length}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={createWallet}>Add Ethereum Wallet</button>
      {addresses.map((address) => (
        <p>{address}</p>
      ))}
    </div>
  );
};

export default EthereumWallet;
