export function StatusMessage({ title, message, tone = 'neutral' }) {
  return (
    <div className={`status-card status-card--${tone}`} role={tone === 'danger' ? 'alert' : 'status'}>
      <strong>{title}</strong>
      {message ? <p>{message}</p> : null}
    </div>
  );
}
