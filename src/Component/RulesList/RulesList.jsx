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

const RulesSetOdd = [
  function Rules1({ input }) {
    return (
      <Rule
        status={input.length >= 5 ? true : false}
        index="1"
        description="Your password must be at least 5 characters."
      />
    );
  },
  function Rules3({ input }) {
    const reg = /[A-Z]/g;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="3"
        description="Your password must include an uppercase letter."
      />
    );
  },
  function Rule5({ input }) {
    const reg = /\d/g;
    const result = input.match(reg).map(Number);
    let sum = 0;
    result.forEach((num) => {
      sum += num;
    });

    return (
      <Rule
        status={sum === 25}
        index="5"
        description="The digits in your password must add up to 25."
      />
    );
  },
  function Rule7({ input }) {
    const reg = /I|V|X|L|C|D|M/g;
    return (
      <Rule
        status={input.match(reg) ? True : False}
        index="7"
        description="Your password must include a roman numeral."
      />
    );
  },
  function Rule9({ input }) {
    const reg = /(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/g;
    const romanNums = input.match(reg);

    const nums = romanNums.map((roman) => {
      const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
      let sum = 0;
      for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];
        if (next && current < next) {
          sum -= current;
        } else {
          sum += current;
        }
      }
      return sum;
    });

    let mul = 1;
    nums.forEach((num) => {
      mul *= num;
    });

    return (
      <Rule
        status={mul === 35}
        index="9"
        description="The roman numerals in your password must multiply to 35"
      />
    );
  },
  function Rule11({ input }) {
    const [wordleAnswer, setWordleAnswer] = useState();

    const wordleHandler = useCallback(async function () {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      const url = `https://proxy.corsfix.com/?https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong :: " + response.status);
        }
        const result = await response.json();
        setWordleAnswer(result.solution);
      } catch (error) {
        console.error(error);
      }
    }, []);

    useEffect(() => {
      wordleHandler();
    }, [wordleHandler]);

    const reg = new RegExp(`${wordleAnswer}`, g, i);

    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="11"
        description="Your password must include today's wordle answer."
      />
    );
  },
  function Rule13({ input }) {
    const moonPhaseObject = {
      "New Moon": "🌑",
      "Waxing Crescent": "🌒",
      "First Quarter": "🌓",
      "Waxing Gibbous": "🌔",
      "Full Moon": "🌕",
      "Waning Gibbous": "🌖",
      "Last Quarter": "🌗",
      "Waning Crescent": "🌘",
    };
    const [moonPhase, setMoonPhase] = useState();
    const moonPhaseHandler = useCallback(async function () {
      const url =
        "https://luna-phase.p.rapidapi.com/Luna_Phase?lat=51.5074&lon=-0.1278";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "998d74b152msh2918a57284edac0p14b823jsne20ebe1c7d0c",
          "x-rapidapi-host": "luna-phase.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Something went wrong :: " + response.status);
        }
        const result = await response.json();
        setMoonPhase(result.Phase_Description);
      } catch (error) {
        console.error(error);
      }
    });
    useEffect(() => {
      moonPhaseHandler();
    }, [moonPhaseHandler]);

    const reg = new RegExp(moonPhaseObject[moonPhase]);

    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="13"
        description="Your password must include the current phase of the moon as an emoji."
      />
    );
  },
  function Rule15({ input }) {
    const reg = /\d+/g;
    const nums = input.match(reg);
    let check = false;
    nums.forEach((num) => {
      if (num % 400 == 0) {
        check = true;
      } else if (num % 4 == 0 && num % 100 != 0) {
        check = true;
      }
    });
    <Rule
      status={check}
      index="15"
      description="Your password must include the current phase of the moon as an emoji."
    />;
  },
  function Rule17({ input }) {
    const reg = /🥚/g;

    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="17"
        description="🥚 ← This is my chicken Paul. He hasn’t hatched yet, please put him in your password and keep him safe."
      />
    );
  },
];
