import { useState, useMemo, useCallback } from 'react'
import OrderCard from '../components/OrderCard'
import ConfirmDialog from '../components/ConfirmDialog'
import { money, pad } from '../utils/format'

export default function Orders({ products, orders, setOrders, notify, goProducts }) {
  const [selId, setSelId] = useState(null)
  const [qty, setQty] = useState(1)
  const [cart, setCart] = useState([])
  const [toDelete, setToDelete] = useState(null)

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart])
  const selected = products.find(p => p.id === selId)

  function addToCart() {
    if (!selected) return
    setCart(c => {
      const ex = c.find(i => i.productId === selected.id)
      if (ex) return c.map(i => i === ex ? { ...i, quantity: i.quantity + qty } : i)
      return [...c, { productId: selected.id, name: selected.name, price: selected.price, image: selected.image, quantity: qty }]
    })
    setQty(1)
  }
  const change = (id, d) => setCart(c => c.map(i => i.productId === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i))
  const remove = id => setCart(c => c.filter(i => i.productId !== id))

  function createOrder() {
    if (!cart.length) return
    const id = orders.reduce((m, o) => Math.max(m, o.id), 0) + 1
    setOrders(o => [{ id, items: cart, total, paid: false, createdAt: Date.now() }, ...o])
    setCart([]); setSelId(null); setQty(1)
    notify(`Order #${pad(id)} created`)
  }

  const toggle = useCallback(id => setOrders(o => o.map(x => x.id === id ? { ...x, paid: !x.paid } : x)), [setOrders])
  const ask = useCallback(o => setToDelete(o), [])

  return (
    <>
      <section className="builder">
        <div className="panel">
          <label className="lbl">Product</label>
          {products.length === 0 ? (
            <div className="empty small">
              <p>No products yet. Add your first fast-food product to get started.</p>
              <button className="btn primary" onClick={goProducts}>+ Add product</button>
            </div>
          ) : (
            <>
              <div className="pick-grid">
                {products.map(p => (
                  <button key={p.id} className={'pick' + (p.id === selId ? ' sel' : '')} onClick={() => setSelId(p.id)}>
                    <img src={p.image} alt="" loading="lazy" />
                    <span className="pn">{p.name}</span>
                    <span className="price">{money(p.price)}</span>
                  </button>
                ))}
              </div>
              <div className="add-row">
                <div className="stepper">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease">−</button>
                  <b>{qty}</b>
                  <button onClick={() => setQty(q => q + 1)} aria-label="Increase">+</button>
                </div>
                <button className="btn primary grow" disabled={!selected} onClick={addToCart}>
                  {selected ? `Add ${qty} × ${selected.name}` : 'Select a product'}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="panel cart">
          <h3>Current order</h3>
          {cart.length === 0 ? <p className="muted pad">Nothing added yet.</p> : (
            <ul className="cart-list">
              {cart.map(i => (
                <li key={i.productId}>
                  <img src={i.image} alt="" />
                  <div className="ci"><span>{i.name}</span><small>{money(i.price * i.quantity)}</small></div>
                  <div className="stepper sm">
                    <button onClick={() => change(i.productId, -1)} aria-label="Decrease">−</button>
                    <b>{i.quantity}</b>
                    <button onClick={() => change(i.productId, 1)} aria-label="Increase">+</button>
                  </div>
                  <button className="x" onClick={() => remove(i.productId)} aria-label={`Remove ${i.name}`}>✕</button>
                </li>
              ))}
            </ul>
          )}
          <div className="total big"><span>Total</span><b>{money(total)}</b></div>
          <button className="btn primary full" disabled={!cart.length} onClick={createOrder}>Create order</button>
        </div>
      </section>

      <h2>Order list</h2>
      {orders.length === 0 ? (
        <div className="empty"><div className="big">🧾</div><h3>No orders yet</h3><p>Create an order to see it here.</p></div>
      ) : (
        <div className="grid orders">
          {orders.map(o => <OrderCard key={o.id} order={o} onToggle={toggle} onDelete={ask} />)}
        </div>
      )}

      {toDelete && (
        <ConfirmDialog title="Delete this order?" text="This action cannot be undone."
          onCancel={() => setToDelete(null)}
          onConfirm={() => { setOrders(o => o.filter(x => x.id !== toDelete.id)); setToDelete(null); notify('Order deleted') }} />
      )}
    </>
  )
}
