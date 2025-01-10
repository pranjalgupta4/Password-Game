import style from "./RuleCardBody.module.css";

export default function RuleCardBody(prop) {
  return (
    <div
      className={`${style.ruleCardBody} ${
        prop.status ? style.ruleCardBodyCorrect : style.ruleCardBodyIncorrect
      }`}
    >
      {prop.children}
    </div>
  );
}
