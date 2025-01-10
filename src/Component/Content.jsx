import style from "./Content.module.css";
import gameTitle from "/gametitle.svg";
import Rules from "./Rules";
import { useRef } from "react";

export default function Content() {
  const inputBoxRef = useRef(null);

  const handleInput = () => {
    if (inputBoxRef.current) {
      inputBoxRef.current.style.height = "auto";
      inputBoxRef.current.style.height = `${inputBoxRef.current.scrollHeight}px`;
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
        <Rules></Rules>
      </div>
    </div>
  );
}
