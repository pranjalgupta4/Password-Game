import style from "./RuleCardHead.module.css";
import cross from "/error.svg";
import tick from "/checkmark.svg";

export default function RuleCardHead(prop) {
  return (
    <div
      className={`${style.ruleCardHead} ${
        prop.status ? style.ruleCardHeadCorrect : style.ruleCardHeadIncorrect
      }`}
    >
      <img src={prop.status ? tick : cross} alt="mark" className={style.mark} />{" "}
      {prop.children}
    </div>
  );
}
