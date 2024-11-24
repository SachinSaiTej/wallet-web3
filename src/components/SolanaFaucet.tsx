import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Airdrop from './Airdrop'

const SolanaFaucet = () => {
  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/JNTlVyWGvhtBvpYDMdehgxGCywOXfykE">
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <WalletMultiButton />
                <WalletDisconnectButton />
                <Airdrop />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
  )
}

export default SolanaFaucet