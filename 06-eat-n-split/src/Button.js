export default function Button({ handleToggle, children }) {
  return (
    <button className="button" onClick={handleToggle}>
      {children}
    </button>
  );
}
