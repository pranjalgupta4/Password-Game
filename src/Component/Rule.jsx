import style from "./Rule.module.css";
import RuleCard from "../UI/RuleCard";
import RuleCardHead from "../UI/RuleCardHead";
import RuleCardBody from "../UI/RuleCardBody";

export default function Rule(prop) {
  return (
    <RuleCard status={prop.status}>
      <RuleCardHead status={prop.status}>Rule X</RuleCardHead>
      <RuleCardBody status={prop.status}>Somthing somthing</RuleCardBody>
    </RuleCard>
  );
}
