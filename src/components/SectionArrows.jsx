const order = ['products', 'orders']
const label = { products: 'Products', orders: 'Orders' }

export default function SectionArrows({ page, setPage }) {
  const i = order.indexOf(page)
  const prev = order[i - 1], next = order[i + 1]
  return (
    <div className="secbar">
      <button className="arrow" disabled={!prev} onClick={() => setPage(prev)} aria-label={prev ? `Go to ${label[prev]}` : 'No previous section'}>‹</button>
      <h1>{label[page]}</h1>
      <button className="arrow" disabled={!next} onClick={() => setPage(next)} aria-label={next ? `Go to ${label[next]}` : 'No next section'}>›</button>
    </div>
  )
}
