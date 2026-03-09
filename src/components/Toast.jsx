function Toast({ open, icon, message }) {
  return (
    <div className={`toast ${open ? 'show' : ''}`} role="status" aria-live="polite">
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}

export default Toast;
