import { ed25519 } from "@noble/curves/ed25519";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import React, { useState } from "react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setbalance] = useState(0);
  //   alert(wallet.publicKey?.toString());

  const sendAirDropToUser = async () => {
    const amount = document.getElementById("amount")!.value;
    await connection.requestAirdrop(wallet.publicKey!, amount * 100000000);
    alert("SOL is airdropped");
  };

  const signMessageClick = async () => {
    if (!wallet.publicKey) throw new Error("Wallet not connected!");
    if (!wallet.signMessage)
      throw new Error("Wallet does not support message signing!");
    const message = document.getElementById("message")!.value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await wallet.signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, wallet.publicKey.toBytes()))
      throw new Error("Signature verification failed!");
    console.log(`success!. Message signature: ${bs58.encode(signature)}`);
    alert(`success!. Message signature: ${bs58.encode(signature)}`);
  };

  const sendToken = async () => {
    let to = document.getElementById("to")!.value;
    let amount = document.getElementById("amount")!.value;
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const x = await wallet.sendTransaction(transaction, connection);
    alert(`Sent ${amount} SOL to ${to}`);
    console.log("Transaction: ", x);
  };

  const getBalance = async () => {
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      setbalance(balance);
    }
  };
  getBalance();
  return (
    <div>
      <input type="text" placeholder="Enter airdrop amount" id="amount" />
      <button onClick={sendAirDropToUser}>Airdrop</button>
      {wallet.publicKey && <div>Solana Balance : {balance}</div>}
      {/* Sign Transaction */}
      <div>
        <h1>Sign a Message</h1>
        <input type="text" placeholder="Message" id="message" />
        <button onClick={signMessageClick}>Sign Message</button>
      </div>
      <div>
        <h1>Send Token</h1>
        <input type="text" placeholder="To" id="to" />
        <input type="text" placeholder="Amount" id="amount" />
        <button onClick={sendToken}>Send</button>
      </div>
    </div>
  );
};

export default Airdrop;
