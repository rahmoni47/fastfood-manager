import { memo } from 'react'
import { money, pad } from '../utils/format'

function OrderCard({ order, onToggle, onDelete }) {
  const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <article className={'card order ' + (order.paid ? 'paid' : 'unpaid')}>
      <header>
        <h4>Order #{pad(order.id)}</h4>
        <span className="muted">{time}</span>
      </header>
      <ul>
        {order.items.map(i => (
          <li key={i.productId}><img src={i.image} alt="" /><span>{i.quantity} × {i.name}</span></li>
        ))}
      </ul>
      <div className="total"><span className="muted">Total</span><b>{money(order.total)}</b></div>
      <div className="row between">
        <span className={'pay ' + (order.paid ? 'on' : '')}><i /> {order.paid ? 'Paid' : 'Unpaid'}</span>
        <div className="row">
          <button className="btn sm" onClick={() => onToggle(order.id)}>{order.paid ? 'Mark unpaid' : 'Mark as paid'}</button>
          <button className="btn ghost sm" onClick={() => onDelete(order)}>Delete</button>
        </div>
      </div>
    </article>
  )
}
export default memo(OrderCard)
