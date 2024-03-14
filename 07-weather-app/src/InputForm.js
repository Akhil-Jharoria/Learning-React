import Button from "./Button";
export default function InputForm() {
  return (
    <form className="input-form">
      <input type="text" placeholder="Enter Your City"></input>
      <Button>Search</Button>
    </form>
  );
}
