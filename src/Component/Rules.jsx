import style from "./Rules.module.css";
import Rule from "./Rule";
import pepsi from "../../public/Sponsers/pepsi.svg";
import shell from "../../public/Sponsers/shell.svg";
import starbucks from "../../public/Sponsers/starbucks.svg";
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
          <img src={pepsi} alt="pepsi" />
          <img src={shell} alt="shell" />
          <img src={starbucks} alt="starbucks" />
        </div>
      </Rule>
      <Rule
        status={true}
        description="Your password must include one of our sponsors:"
        index="8"
      />
    </>
  );
}
