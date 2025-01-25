import Rule from "./Rule";
import RulesList from "./RulesList/RulesList";
import style from "./Rules.module.css";
import React, { useEffect, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";

export default function Rules({
  input,
  numRules,
  setNumRules,
  setInput,
  inputRef,
}) {
  const activeRule = RulesList.slice(0, 18);
  const statusArrayRef = useRef([]);

  useEffect(() => {
    const statusSlice = statusArrayRef.current.slice(0, numRules);
    if (!statusSlice.includes(false)) {
      setNumRules((prev) => prev + 1);
    }
  }, [input, setNumRules, numRules]);
  let temp2 = demo(setInput, inputRef);

  return (
    <div className={style.rules}>
      <div className={style.followed}>
        {activeRule.map((func, index) => {
          const temp = func(input, numRules);
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
            return <React.Fragment key={index} />;
          }
        })}
      </div>
      <div className={style.unfollowed}>
        {activeRule.map((func, index) => {
          const temp = func(input, numRules);
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
            return <React.Fragment key={index} />;
          }
        })}
      </div>
      {temp2.comp}
    </div>
  );
}

function demo(setinput, inputRef) {
  let isFollowed = false;
  // const divRef = useRef(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString(); // Extract selected text
      if (selectedText) {
        const range = selection.getRangeAt(0); // Get the first range of selection
        console.log("Selected text:", range.commonAncestorContainer.firstChild.innerHTML);
        if (
          inputRef.current.contains(range.commonAncestorContainer.firstChild)
        ) {
          console.log("Selected text:", selectedText);
          setinput(selectedText);
        }
      }
    }
  };
  return {
    comp: (
      <Rule
        status={isFollowed}
        index="20"
        description="Oh no! Your password is on fire. Quick, put it out!"
        onMouseDown={handleTextSelection}
      ></Rule>
    ),
    isFollowed,
  };
}
