import "./AvtarWithBorder.css";

export function AvtarWithBorder({ url, size }) {
  return (
    <div
      className="UserAvtar"
      style={{ height: size + "rem", width: size + "rem" }}
    >
      <div
        className="UserAvtarImageContainer"
        style={{ height: size - 0.5 + "rem", width: size - 0.5 + "rem" }}
      >
        <img
          src={url ?? "../asserts/user.png"}
          alt="avtar"
          style={{ height: size - 1 + "rem", width: size - 1 + "rem" }}
        />
      </div>
    </div>
  );
}
