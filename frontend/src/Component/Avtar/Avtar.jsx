import "./Avtar.css";

export function Avtar({ url, size }) {
  return (
    <div
      className="AvtarContainer"
      style={{ height: size + "rem", width: size + "rem" }}
    >
      <img src={url ?? "../asserts/user.png"} alt="avtar" />
    </div>
  );
}
