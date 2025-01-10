import style from "./App.module.css";
import neal from "/nealfun.svg";
import Content from "./Component/Content";

export default function App() {
  return (
    <div className={style.gamePage}>
      <div className={style.logobar}>
        <img src={neal} alt="neal" className={style.logo} />
      </div>
      <Content />
    </div>
  );
}
