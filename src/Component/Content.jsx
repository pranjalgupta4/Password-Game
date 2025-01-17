import style from "./Content.module.css";
import gameTitle from "/gametitle.svg";
import Rules from "./Rules";
import { useRef, useState } from "react";

export default function Content() {
  const inputBoxRef = useRef(null);
  const [password, setPassword] = useState("");
  const [numRules, setNumRules] = useState(1);
  
  const handleInput = () => {
    if (inputBoxRef.current) {
      inputBoxRef.current.style.height = "auto";
      inputBoxRef.current.style.height = `${inputBoxRef.current.scrollHeight}px`;
      setPassword(inputBoxRef.current.value);
    }
  };

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
