import style from "./Content.module.css";
import gameTitle from "/gametitle.svg";
import Rules from "./Rules";
import { useEffect, useRef, useState } from "react";
import GraphemeSplitter from "grapheme-splitter";

export default function Content() {
  const inputBoxRef = useRef(null);
  const [password, setPassword] = useState("");
  const [numRules, setNumRules] = useState(1);
  const [wordCount, setwordCount] = useState(0);
  let splitter = new GraphemeSplitter();

  const handleInput = () => {
    if (inputBoxRef.current) {
      inputBoxRef.current.style.height = "auto";
      inputBoxRef.current.style.height = `${inputBoxRef.current.scrollHeight}px`;
      setPassword(inputBoxRef.current.value);
    }
  };
  useEffect(() => {
    setwordCount(splitter.countGraphemes(password));
  }, [password]);

  return (
    <div className={style.contentArea}>
      <div className={style.gameTitleDiv}>
        <img src={gameTitle} alt="Password Game" className={style.gameTitle} />
      </div>
      <div className={style.inputArea}>
        <div className={style.inputLabel}>Please choose a password</div>
        <div className={style.inputBoxDiv}>
          <textarea
            onChange={handleInput}
            ref={inputBoxRef}
            rows={1}
            name="textarea"
            className={style.inputBox}
          ></textarea>
          <p className={style.inputBoxDivP}>{wordCount}</p>
        </div>
        <Rules
          input={password}
          numRules={numRules}
          setNumRules={setNumRules}
        ></Rules>
      </div>
    </div>
  );
}
