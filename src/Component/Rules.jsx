import Rule from "./Rule";
import RulesList from "./RulesList/RulesList";
import styles from "./Rules.module.css";
import { useEffect } from "react";

export default function Rules({ input, numRules, setNumRules }) {
  const activeRule = RulesList.slice(0, numRules);
  let statusArray = [];

  useEffect(() => {
    if (!statusArray.includes(false)) {
      setNumRules((prev) => prev + 1);
    }
  }, [input]);

  return (
    <div className={styles.rules}>
      {activeRule.map((func, index) => {
        const temp = func(input);
        statusArray[index] = temp.isFollowed;
        return <div key={index}>{temp.comp}</div>;
      })}
    </div>
  );
}
