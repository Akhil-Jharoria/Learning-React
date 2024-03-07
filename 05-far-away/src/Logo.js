import Form from "./Form";
export default function Logo({ onAddItems }) {
  return (
    <>
      <h1>🌴 Far Away 👜</h1>
      <Form onAddItem={onAddItems} />
    </>
  );
}
