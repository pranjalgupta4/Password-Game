import Rule from "../Rule";
import pepsi from "../../public/Sponsers/pepsi.svg";
import shell from "../../public/Sponsers/shell.svg";
import starbucks from "../../public/Sponsers/starbucks.svg";
import refresh from "../../public/refresh.svg";
import defaultCaptcha from "../../public/default-captcha.png";
import { useState, useEffect, useCallback } from "react";
// import googleMapList from "./googleMapList";

const RulesList = [
  function Rule2(input) {
    const reg = /\d/g;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="2"
        description="Your password must include a number."
      />
    );
  },
  function Rule4(input) {
    const reg = /[^\w\s]/g;
    return (
      <Rule
        status={input.match(reg) ? false : true}
        index="4"
        description="Your password must include a special character."
      />
    );
  },
  function Rule6(input) {
    const reg =
      /(January|February|March|April|May|June|July|August|September|October|November|December)/gi;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="6"
        description="Your password must include a month of the year."
      />
    );
  },
  function Rule8(input) {
    const reg = /(pepsi|starbucks|shell)/gi;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="8"
        description="Your password must include one of our sponsors:"
      >
        <div>
          <img src={pepsi} alt="pepsi" />
          <img src={shell} alt="shell" />
          <img src={starbucks} alt="starbucks" />
        </div>
      </Rule>
    );
  },

  function Rule10(input) {
    const [imgUrl, setImgUrl] = useState(defaultCaptcha);
    const [captchaText, setCaptchaText] = useState("WCf6Uc");

    const captchaHandler = useCallback(async function () {
      const url =
        "https://captcha-generator.p.rapidapi.com/?noise_number=10&fontname=sora";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "e19ed6da22msh90d963871b5a9c5p1a90ffjsna8b019130de4",
          "x-rapidapi-host": "captcha-generator.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const finalResult = JSON.parse(result);
        setImgUrl(finalResult.image_url);
        setCaptchaText(finalResult.solution);
      } catch (error) {
        console.error(error);
      }
    }, []);

    useEffect(() => {
      captchaHandler();
    }, [captchaHandler]);

    const reg = new RegExp(captchaText);
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="10"
        description="Your password must include this CAPTCHA:"
      >
        <div>
          <img src={imgUrl} alt="Image Captcha" />
          {/*add classname={styles["captcha-img"]} */}
          <img src={refresh} alt="refresh" onClick={captchaHandler} />
          {/*add classname={styles["captcha-refresh"]} both are located in Rules.module.css*/}
        </div>
      </Rule>
    );
  },
  function Rule12(input) {
    const reg =
      /(He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Fl|Lv|Ts|Og)/g;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="12"
        description="Your password must include a two letter symbol from the periodic table."
      />
    );
  },
  function Rule14(input) {
    const reg =
      /(January|February|March|April|May|June|July|August|September|October|November|December)/gi;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="14"
        description="Your password must include the name of this country."
      />
    );
  },
];
