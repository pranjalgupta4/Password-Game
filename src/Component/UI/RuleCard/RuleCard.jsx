import style from "./RuleCard.module.css";

export default function RuleCard(prop) {
  return (
    <div
      onMouseDown={prop.onMouseDown}
      className={`${style.ruleCard} ${
        prop.status ? style.ruleCardCorrect : style.ruleCardIncorrect
      }`}
    >
      {prop.children}
    </div>
  );
}
