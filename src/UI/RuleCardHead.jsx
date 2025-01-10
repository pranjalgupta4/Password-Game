import style from "./RuleCardHead.module.css";

export default function RuleCardHead(prop) {
  return (
    <div
      className={
        prop.status ? style.ruleCardHeadCorrect : style.ruleCardHeadIncorrect
      }
    >
      {prop.children}
    </div>
  );
}
