import { generateMnemonic } from 'bip39';
import { useState } from 'react'
import SolanaWallet from './SolanaWallet';
import EthereumWallet from './EthereumWallet';

const WalletGenerator = () => {
    const [menmonic, setMenmonic] = useState("");

    const onClickForMnemonic = () => {
      const mn = generateMnemonic();
      setMenmonic(mn);
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={onClickForMnemonic}>Create Seed Phrase</button>
        {menmonic && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Generated Mnemonic</p>
            <p style={{ wordBreak: "break-all" }}>{menmonic}</p>
            <SolanaWallet mnemonic={menmonic} />
            <EthereumWallet mnemonic={menmonic} />
          </div>
        )}
      </div>
    );
}

export default WalletGenerator