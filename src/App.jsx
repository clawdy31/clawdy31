import React, { useState, useEffect } from 'react'
import { useAccount, useBalance, useSendTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther } from 'viem'

function App() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { sendTransaction, isPending } = useSendTransaction()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('')

  const handleSend = async (e) => {
    e.preventDefault()
    if (!recipient || !amount) {
      setStatus('Please fill in all fields')
      return
    }
    try {
      await sendTransaction({
        to: recipient,
        value: parseEther(amount),
      })
      setStatus('Transaction sent!')
      setRecipient('')
      setAmount('')
      setTimeout(() => setStatus(''), 3000)
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Base Mini App</h1>
        <ConnectButton />
      </header>

      <main>
        {isConnected ? (
          <>
            <div className="card info-card">
              <p><strong>Address:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              <p><strong>Balance:</strong> {balance ? parseFloat(balance.formatted).toFixed(4) : '0'} {balance?.symbol}</p>
            </div>

            <form onSubmit={handleSend} className="card">
              <h2>Send ETH</h2>
              <input
                type="text"
                placeholder="Recipient address (0x...)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <input
                type="number"
                step="0.0001"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button type="submit" disabled={isPending}>
                {isPending ? 'Sending...' : 'Send ETH'}
              </button>
              {status && <p className="status">{status}</p>}
            </form>

            <div className="card">
              <h2>Quick Links</h2>
              <div className="links">
                <a href="https://bridge.base.org" target="_blank" rel="noopener">Bridge</a>
                <a href="https://basescan.org" target="_blank" rel="noopener">BaseScan</a>
                <a href="https://app.uniswap.org" target="_blank" rel="noopener">Uniswap</a>
              </div>
            </div>
          </>
        ) : (
          <div className="card placeholder">
            <p>Connect your wallet to get started</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
