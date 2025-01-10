import style from "./RuleCardBody.module.css";

export default function RuleCardBody(prop) {
  return (
    <div
      className={
        prop.status ? style.ruleCardBodyCorrect : style.ruleCardBodyIncorrect
      }
    >
      {prop.children}
    </div>
  );
}
