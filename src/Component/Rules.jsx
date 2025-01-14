import Rule from "./Rule";
import pepsi from "../../public/Sponsers/pepsi.svg";
import shell from "../../public/Sponsers/shell.svg";
import starbucks from "../../public/Sponsers/starbucks.svg";
import refresh from "../../public/refresh.svg";
import defaultCaptcha from "../../public/default-captcha.png";
import styles from "./Rules.module.css";
// import googleMapList from "./RulesList/googleMapList";

export default function Rules() {
  return (
    <>
      <Rule
        status={false}
        description="Your password must include one of our sponsors:"
        index="8"
      >
        <div>
          <img
            src={defaultCaptcha}
            alt="Image Captcha"
            className={styles["captcha-img"]}
          />
          <img
            src={refresh}
            alt="refresh"
            className={styles["captcha-refresh"]}
          />
        </div>
      </Rule>
      <Rule
        status={true}
        description="Your password must include one of our sponsors:"
        index="8"
      />
      <Rule
        status={true}
        index="8"
        description="Your password must include one of our sponsors:"
      >
        <div>
          <img src={pepsi} alt="pepsi" />
          <img src={shell} alt="shell" />
          <img src={starbucks} alt="starbucks" />
        </div>
      </Rule>
    </>
  );
}
