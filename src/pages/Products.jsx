import { useState, useRef } from 'react'
import ImageSelector from '../components/ImageSelector'
import ConfirmDialog from '../components/ConfirmDialog'
import { productImages } from '../data/productImages'
import { money } from '../utils/format'

export default function Products({ products, setProducts, notify }) {
  const [image, setImage] = useState(productImages[0])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [toDelete, setToDelete] = useState(null)
  const nameRef = useRef(null)

  const valid = name.trim() && Number(price) > 0

  function add(e) {
    e.preventDefault()
    if (!valid) return
    setProducts(p => [...p, { id: Date.now(), name: name.trim(), price: Number(price), image }])
    setName(''); setPrice('')
    notify('Product added')
    nameRef.current?.focus()
  }

  return (
    <>
      <form className="panel" onSubmit={add}>
        <label className="lbl">Image</label>
        <ImageSelector value={image} onChange={setImage} />
        <div className="form-row">
          <div className="grow">
            <label className="lbl" htmlFor="pn">Name</label>
            <input id="pn" ref={nameRef} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Chicken Burger" />
          </div>
          <div className="price-f">
            <label className="lbl" htmlFor="pp">Price (DZD)</label>
            <input id="pp" type="number" inputMode="numeric" min="1" step="any" value={price} onChange={e => setPrice(e.target.value)} placeholder="350" />
          </div>
          <button className="btn primary" disabled={!valid}>+ Add product</button>
        </div>
      </form>

      {products.length === 0 ? (
        <div className="empty">
          <div className="big">🍽️</div>
          <h3>No products yet</h3>
          <p>Add your first fast-food product to get started.</p>
          <button className="btn primary" onClick={() => nameRef.current?.focus()}>+ Add product</button>
        </div>
      ) : (
        <div className="grid">
          {products.map(p => (
            <article className="card product" key={p.id}>
              <img src={p.image} alt="" loading="lazy" />
              <div className="pinfo">
                <h4>{p.name}</h4>
                <span className="price">{money(p.price)}</span>
              </div>
              <button className="btn ghost sm" onClick={() => setToDelete(p)} aria-label={`Delete ${p.name}`}>Delete</button>
            </article>
          ))}
        </div>
      )}

      {toDelete && (
        <ConfirmDialog title="Delete this product?" text={`"${toDelete.name}" will be removed from the menu. Existing orders are not affected.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => { setProducts(p => p.filter(x => x.id !== toDelete.id)); setToDelete(null); notify('Product deleted') }} />
      )}
    </>
  )
}
