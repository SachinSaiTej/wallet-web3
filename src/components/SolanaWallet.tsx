import { Keypair } from "@solana/web3.js";
import axios from "axios";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import React from "react";
import nacl from "tweetnacl";

const SolanaWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [publicKeys, setPublicKeys] = React.useState<string[]>([]);
  const [balance, setBalance] = React.useState<number>(0);
  const createWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${publicKeys.length}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
  };

  const fetchDetailsForTheAccount = async (publicKey: string) => {
    try {
        setBalance(0);
      const { data } = await axios.post(`https://api.devnet.solana.com/`, {
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params:[publicKey]
        // params: ["Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"],
        // params: ["6fTbxBg15sAfWFzpYYpk37iqPXboD2czi8ZaaWSCv4qu"],
      });
      console.log(data);
      console.log(`${publicKey} has ${balance} SOL`);
      if(data.result.value) {
          setBalance(data.result.value.lamports * 10**-9);
      }

      alert(`${publicKey} has ${balance} SOL`);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={createWallet}>Add Solana Wallet</button>
      {publicKeys.map((publicKey) => (
        <div style={{ display: "flex", margin: "2em", gap: "2em" }}>
          <p>{publicKey}</p>
          <button onClick={() => fetchDetailsForTheAccount(publicKey)} style={{ background: "green" }}>Get Balance</button>
        </div>
      ))}
    {/* 6fTbxBg15sAfWFzpYYpk37iqPXboD2czi8ZaaWSCv4qu */}
    {/* "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" */}
    </div>
  );
};

export default SolanaWallet;
