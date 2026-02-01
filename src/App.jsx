import { useState } from 'react'
import { useAccount, useBalance, useSendTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther } from 'viem'

function App() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { sendTransaction, isPending } = useSendTransaction()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!recipient || !amount) return
    sendTransaction({
      to: recipient,
      value: parseEther(amount),
    })
    setRecipient('')
    setAmount('')
  }

  return (
    <div className="container">
      <header>
        <h1>⚛️ Mini Base App</h1>
        <ConnectButton />
      </header>

      {isConnected ? (
        <main>
          <div className="card info-card">
            <div className="info-row">
              <span className="label">Address:</span>
              <span className="value address">{address}</span>
            </div>
            <div className="info-row">
              <span className="label">Balance:</span>
              <span className="value">{balance?.formatted} {balance?.symbol}</span>
            </div>
            <div className="info-row">
              <span className="label">Network:</span>
              <span className="value">Base</span>
            </div>
          </div>

          <form onSubmit={handleSend} className="card send-card">
            <h2>Send ETH</h2>
            <div className="form-group">
              <label>Recipient Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Amount (ETH)</label>
              <input
                type="number"
                step="0.000001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isPending || !recipient || !amount}>
              {isPending ? 'Sending...' : 'Send'}
            </button>
          </form>

          <div className="card links-card">
            <h2>Quick Links</h2>
            <div className="links">
              <a href="https://bridge.base.org" target="_blank" rel="noopener noreferrer">
                Bridge to Base
              </a>
              <a href="https://basescan.org" target="_blank" rel="noopener noreferrer">
                BaseScan
              </a>
              <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer">
                Uniswap on Base
              </a>
              <a href="https://chainlist.org/chain/8453" target="_blank" rel="noopener noreferrer">
                Add Base to Wallet
              </a>
            </div>
          </div>
        </main>
      ) : (
        <div className="card placeholder">
          <p>Connect your wallet to get started</p>
        </div>
      )}
    </div>
  )
}

export default App
