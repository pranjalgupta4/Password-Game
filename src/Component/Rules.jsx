import Rule from "./Rule";
import RulesList from "./RulesList/RulesList";
import style from "./Rules.module.css";
import { useEffect, useRef } from "react";
export default function Rules({ input, numRules, setNumRules }) {
  const activeRule = RulesList.slice(0, 18);
  const statusArrayRef = useRef([]);
  useEffect(() => {
    const statusSlice = statusArrayRef.current.slice(0, numRules);
    if (!statusSlice.includes(false)) {
      setNumRules((prev) => prev + 1);
    }
  }, [input, setNumRules, numRules]);
  return (
    <div className={style.rules}>
      <div className={style.followed}>
        {activeRule.map((func, index) => {
          const temp = func(input);
          statusArrayRef.current[index] = temp.isFollowed;
          if (temp.isFollowed) {
            return (
              <div
                key={index}
                className={index >= numRules ? style.hidden : ""}
              >
                {temp.comp}
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
      <div className={style.unfollowed}>
        {activeRule.map((func, index) => {
          const temp = func(input);
          statusArrayRef.current[index] = temp.isFollowed;
          if (!temp.isFollowed) {
            return (
              <div
                key={index}
                className={index >= numRules ? style.hidden : ""}
              >
                {temp.comp}
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
}
