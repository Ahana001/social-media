import "./Avtar.css";

export function Avtar({ url }) {
  return (
    <div className="AvtarContainer">
      <img src={url ?? "../asserts/user.png"} alt="avtar" />
    </div>
  );
}
