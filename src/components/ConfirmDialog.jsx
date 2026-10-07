export default function ConfirmDialog({ title, text, onCancel, onConfirm }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="dialog" role="alertdialog" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="row end">
          <button className="btn ghost" onClick={onCancel} autoFocus>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
