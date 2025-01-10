import style from "./Rules.module.css";
import Rule from "./Rule";

export default function Rules() {
  return (
    <>
      <Rule status={false} />
      <Rule status={true} />
    </>
  );
}
