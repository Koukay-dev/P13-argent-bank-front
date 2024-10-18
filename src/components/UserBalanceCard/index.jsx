


export default function UserBalanceCard({accountName = '' ,cardNumber= 'x0000', availableBalance='1000'}) {
  return (
    <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank {accountName} ({cardNumber})</h3>
          <p className="account-amount">${availableBalance}</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
  )
}
