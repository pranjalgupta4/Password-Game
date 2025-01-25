import style from "./Rule.module.css";
import RuleCard from "./UI/RuleCard/RuleCard";
import RuleCardHead from "./UI/RuleCard/RuleCardHead";
import RuleCardBody from "./UI/RuleCard/RuleCardBody";

export default function Rule(prop) {
  return (
    <RuleCard status={prop.status} onMouseDown={prop.onMouseDown}>
      <RuleCardHead status={prop.status}>Rule {prop.index}</RuleCardHead>
      <RuleCardBody status={prop.status}>
        {prop.description}
        {prop.children}
      </RuleCardBody>
    </RuleCard>
  );
}
