import { productImages } from '../data/productImages'

export default function ImageSelector({ value, onChange }) {
  return (
    <div className="img-grid" role="radiogroup" aria-label="Product image">
      {productImages.map(src => (
        <button type="button" key={src} role="radio" aria-checked={value === src}
          className={'img-opt' + (value === src ? ' sel' : '')} onClick={() => onChange(src)}>
          <img src={src} alt="" loading="lazy" />
        </button>
      ))}
    </div>
  )
}
