import Rule from "../Rule";
import pepsi from "../../../public/Sponsers/pepsi.svg";
import shell from "../../../public/Sponsers/shell.svg";
import starbucks from "../../../public/Sponsers/starbucks.svg";
import refresh from "../../../public/refresh.svg";
import defaultCaptcha from "../../../public/default-captcha.png";
import { useState, useEffect, useCallback } from "react";
import { googleMapList, countryNames } from "../assets/googleMapList";
import { Chess } from "chess.js";
import styles from "../Rules.module.css";
import chessFens from "../assets/chessFens";
import periodicTable from "../assets/periodicTable";

const RulesList = [
  function Rule2(props) {
    const reg = /\d/g;
    return (
      <Rule
        status={props.input.match(reg) ? true : false}
        index="2"
        description="Your password must include a number."
      />
    );
  },
  function Rule4(props) {
    const reg = /[^\w\s]/g;
    return (
      <Rule
        status={props.input.match(reg) ? false : true}
        index="4"
        description="Your password must include a special character."
      />
    );
  },
  function Rule6(props) {
    const reg =
      /(January|February|March|April|May|June|July|August|September|October|November|December)/gi;
    return (
      <Rule
        status={props.input.match(reg) ? true : false}
        index="6"
        description="Your password must include a month of the year."
      />
    );
  },
  function Rule8(props) {
    const reg = /(pepsi|starbucks|shell)/gi;
    return (
      <Rule
        status={props.input.match(reg) ? true : false}
        index="8"
        description="Your password must include one of our sponsors:"
      >
        <div>
          <img src={pepsi} alt="pepsi" className={styles["rule-div-img"]} />
          <img src={shell} alt="shell" className={styles["rule-div-img"]} />
          <img
            src={starbucks}
            alt="starbucks"
            className={styles["rule-div-img"]}
          />
        </div>
      </Rule>
    );
  },
  function Rule10(props) {
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
        status={props.input.match(reg) ? true : false}
        index="10"
        description="Your password must include this CAPTCHA:"
      >
        <div>
          <img
            src={imgUrl}
            alt="Image Captcha"
            className={styles["captcha-img"]}
          />
          <img
            src={refresh}
            alt="refresh"
            onClick={captchaHandler}
            className={styles["captcha-refresh"]}
          />
        </div>
      </Rule>
    );
  },
  function Rule12(props) {
    const reg =
      /(He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Fl|Lv|Ts|Og)/g;
    return (
      <Rule
        status={props.input.match(reg) ? true : false}
        index="12"
        description="Your password must include a two letter symbol from the periodic table."
      />
    );
  },
  function Rule14(props) {
    const place = googleMapList[Math.floor(Math.random() * 64)];
    const reg = new RegExp(place.title, "gi");
    const countries = [];
    countryNames.map((name) => {
      const reg2 = new RegExp(name, "gi");
      props.input.match(reg2) && countries.push(name);
    });
    const status = props.input.match(reg) ? true : false;

    return (
      <Rule
        status={status}
        description="Your password must include the name of this country."
        index="14"
      >
        {countries && !status && (
          <div className={styles.marginTop}>
            {countries.map((ele) => {
              return (
                <>
                  <img
                    src={errorSvg}
                    alt="errorSvg"
                    className={styles.errorSvg}
                  />
                  {ele}
                </>
              );
            })}
          </div>
        )}
        <iframe className={styles.googlemap} src={place.embed} loading="lazy" />
      </Rule>
    );
  },
  function Rule16(props) {
    const description = (
      <>
        Your password must include the best move in
        <a
          href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)"
          target="_blank"
          className={styles["anchor-tag"]}
        >
          algebraic chess notation
        </a>
      </>
    );

    const reg = /([KQRBN]?x?[a-h][1-8](\=[QRBN])?|O-O(-O)?)\+?\#?/g;
    let status = false;
    let element = [];
    const index = Math.floor(Math.random() * 192);

    if (props.input.match(reg)) {
      const moves = props.input.match(reg);
      moves.map((move) => {
        try {
          const chess = new Chess();
          chess.load(chessFens[index].fen);
          const validMove = chess.move(move);

          if (validMove) {
            const newReg2 = new RegExp(validMove.san);
            if (!move.match(newReg2)) {
              element.push(<p>{move} (Invalid Notation)</p>);
              status = false;
            } else {
              const newReg = new RegExp(chessFens[index].sol, "g");
              if (move.match(newReg)) {
                status = true;
              } else {
                element.push(<p>{move}</p>);
                status = false;
              }
            }
          } else {
            element.push(<p>{move} (Crazy error)</p>);
          }
        } catch (error) {
          element.push(<p>{move} (Illegel Move)</p>);
        }
      });
    } else {
      status = false;
    }
    return (
      <Rule status={status} description={description} index="16">
        <div className={styles["chessboard"]}>
          {element && !status && (
            <div className={styles.marginTop}>
              {element.map((ele) => {
                return (
                  <>
                    <img
                      src={errorSvg}
                      alt="errorSvg"
                      className={styles.errorSvg}
                    />
                    {ele}
                  </>
                );
              })}
            </div>
          )}
          <img
            src={`https://fen2image.chessvision.ai/${chessFens[index].fen}`}
            alt="Chessboard"
            className={styles["chessboard-img"]}
          />

          {chessFens[index].fen.match(/\sb\s/g) ? (
            <p className={styles["chessboard-p"]}>Black to move</p>
          ) : (
            <p className={styles["chessboard-p"]}>White to move</p>
          )}
        </div>
      </Rule>
    );
  },
  function Rule18(props) {
    let status = false;
    function calculateTotalAtomicMass(input) {
      const reg = /[A-Z][a-z]?/g;
      const matches = input.match(reg);

      return matches.reduce((total, symbol) => {
        const fullElement = periodicTable[symbol];

        if (fullElement) {
          return total + Math.round(parseFloat(fullElement.atomicMass));
        } else {
          const singleElement = periodicTable[symbol[0]];

          return singleElement
            ? total + Math.round(parseFloat(singleElement.atomicMass))
            : total;
        }
      }, 0);
    }

    const totalMass = calculateTotalAtomicMass(props.input);
    totalMass === 200 ? (status = true) : (status = false);

    return (
      <Rule
        status={status}
        description="The elements in your password must have atomic numbers that add up to 200."
        index="18"
      />
    );
  },
  // function Rule22(props) {
  //   const description = (
  //     <>
  //       <p>Your password must contain one of the following affirmations:</p>
  //       <ul className={styles["unordered-list"]}>
  //         <li>I am loved</li>
  //         <li>I am worthy</li>
  //         <li>I am enough</li>
  //       </ul>
  //     </>
  //   );
  //   const reg = /I am (loved|worthy|enough)/gi;

  //   return (
  //     <Rule
  //       status={props.input.match(reg) ? true : false}
  //       description={description}
  //       index="22"
  //     />
  //   );
  // },
];

export default RulesList;
