import { Keypair } from '@solana/web3.js';
import { mnemonicToSeed } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import React from 'react'
import nacl from 'tweetnacl';

const SolanaWallet = ({mnemonic}:{mnemonic:string}) => {
    const [publicKeys, setPublicKeys] = React.useState<string[]>([]);
    
    
    const createWallet = async () => {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${publicKeys.length}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
    }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={createWallet}>Add Solana Wallet</button>
        {publicKeys.map((publicKey)=>(
            <p>{publicKey}</p>
        ))}
    </div>
  )
}

export default SolanaWallet