import { useConnection, useWallet } from "@solana/wallet-adapter-react";
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
    </div>
  );
};

export default Airdrop;
