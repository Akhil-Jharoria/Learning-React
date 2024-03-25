export default function Error({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <div className="error-message">Oops! {message}.</div>
      <button className="try-again-button">Try Again</button>
    </div>
  );
}
