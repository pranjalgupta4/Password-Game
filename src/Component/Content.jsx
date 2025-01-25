import style from "./Content.module.css";
import gameTitle from "/gametitle.svg";
import Rules from "./Rules";
import { useEffect, useRef, useState } from "react";
import GraphemeSplitter from "grapheme-splitter";
import AuthContext from "../store/auth-context";
import JoditEditor from "jodit-react";

export default function Content() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    // readonly: false,
    // toolbarButtonSize: "middle",
    buttons: ["bold"],
    placeholder: " ",
    // toolbarAdaptive: false,
    statusbar: false,
    toolbar: false,
    minHeight: null,
    height: "65px",
    width: "485px",
    style: {
      fontFamily: "Arial",
      fontSize: "28px",
    },
    resize: null,
  };

  const inputBoxRef = useRef(null);
  const [password, setPassword] = useState("");
  const [numRules, setNumRules] = useState(1);
  const [wordCount, setwordCount] = useState(0);
  let splitter = new GraphemeSplitter();

  const handleInput = (newContent) => {
    setContent(newContent);
    setPassword(newContent);

    // Get editor instance
    if (editor.current?.editor) {
      const wysiwyg =
        editor.current.editor.workplace.querySelector(".jodit-wysiwyg");
      if (wysiwyg) {
        wysiwyg.style.height = "auto";
        wysiwyg.style.height = `${wysiwyg.scrollHeight}px`;
      }
    }
  };
  useEffect(() => {
    setwordCount(splitter.countGraphemes(password));
  }, [password]);

  return (
    <AuthContext.Provider
      value={{ setInput: setPassword, wordCount: wordCount }}
    >
      <div className={style.contentArea}>
        <div className={style.gameTitleDiv}>
          <img
            src={gameTitle}
            alt="Password Game"
            className={style.gameTitle}
          />
        </div>
        <div className={style.inputArea}>
          <div className={style.inputLabel}>Please choose a password</div>
          <div className={style.inputBoxDiv}>
            {/* <textarea
              onChange={handleInput}
              ref={inputBoxRef}
              rows={1}
              name="textarea"
              className={style.inputBox}
              value={password}
            ></textarea> */}
            <JoditEditor
              onChange={handleInput}
              ref={editor}
              value={content}
              config={config}
              className={style.joditEditor}
              // tabIndex={1}
              // onBlur={(newContent) => setContent(newContent)}
              // onChange={(newContent) => setContent(newContent)}
            />
            <p className={style.inputBoxDivP}>{wordCount}</p>
          </div>
          <Rules
            input={password}
            numRules={numRules}
            setNumRules={setNumRules}
            setInput={setPassword}
            inputRef={inputBoxRef}
          ></Rules>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
