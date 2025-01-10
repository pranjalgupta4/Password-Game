import style from "./RuleCard.module.css";

export default function RuleCard(prop) {
  return (
    <div
      className={prop.status ? style.ruleCardCorrect : style.ruleCardIncorrect}
    >
      {prop.children}
    </div>
  );
}
