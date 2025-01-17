import Rule from "../Rule";
import pepsi from "../../../public/Sponsers/pepsi.svg";
import shell from "../../../public/Sponsers/shell.svg";
import starbucks from "../../../public/Sponsers/starbucks.svg";
import refresh from "../../../public/refresh.svg";
import errorSvg from "../../../public/error.svg";
import defaultCaptcha from "../../../public/default-captcha.png";
import { useState, useEffect, useCallback ,useRef} from "react";
import { googleMapList, countryNames } from "../assets/googleMapList";
import { Chess } from "chess.js";
import styles from "../Rules.module.css";
import chessFens from "../assets/chessFens";
import periodicTable from "../assets/periodicTable";

const RulesList = [
  function Rule1(input) {
    const isFollowed = input.length >= 5 ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="1"
          description="Your password must be at least 5 characters."
        />
      ),
      isFollowed,
    };
  },
  function Rule2(input) {
    const reg = /\d/g;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="2"
          description="Your password must include a number."
        />
      ),
      isFollowed,
    };
  },
  function Rule3(input) {
    const reg = /[A-Z]/g;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="3"
          description="Your password must include an uppercase letter."
        />
      ),
      isFollowed,
    };
  },
  function Rule4(input) {
    const reg = /[^\w\s]/g;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="4"
          description="Your password must include a special character."
        />
      ),
      isFollowed,
    };
  },
  function Rule5(input) {
    const reg = /\d/g;
    let result = input.match(reg);
    let sum = 0;
    if (result) {
      result = result.map(Number);
      result.forEach((num) => {
        sum += num;
      });
    }
    const isFollowed = sum === 25 ? true : false;

    return {
      comp: (
        <Rule
          status={isFollowed}
          index="5"
          description="The digits in your password must add up to 25."
        />
      ),
      isFollowed,
    };
  },
  function Rule6(input) {
    const reg =
      /(January|February|March|April|May|June|July|August|September|October|November|December)/gi;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="6"
          description="Your password must include a month of the year."
        />
      ),
      isFollowed,
    };
  },
  function Rule7(input) {
    const reg = /I|V|X|L|C|D|M/g;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="7"
          description="Your password must include a roman numeral."
        />
      ),
      isFollowed,
    };
  },
  function Rule8(input) {
    const reg = /(pepsi|starbucks|shell)/gi;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
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
      ),
      isFollowed,
    };
  },
  function Rule9(input) {
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
      if (sum === 0) {
        return 1;
      }
      return sum;
    });

    let mul = 1;
    nums.forEach((num) => {
      mul *= num;
    });
    const isFollowed = mul === 35;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="9"
          description="The roman numerals in your password must multiply to 35"
        />
      ),
      isFollowed,
    };
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
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
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
      ),
      isFollowed,
    };
  },
  function Rule11(input) {
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

    const reg = new RegExp(`${wordleAnswer}`, "g", "i");
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="11"
          description="Your password must include today's wordle answer."
        />
      ),
      isFollowed,
    };
  },
  function Rule12(input) {
    const reg =
      /(He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Sc|Ti|Cr|Mn|Fe|Co|Ni|Cu|Zn|Ga|Ge|As|Se|Br|Kr|Rb|Sr|Zr|Nb|Mo|Tc|Ru|Rh|Pd|Ag|Cd|In|Sn|Sb|Te|Xe|Cs|Ba|La|Ce|Pr|Nd|Pm|Sm|Eu|Gd|Tb|Dy|Ho|Er|Tm|Yb|Lu|Hf|Ta|W|Re|Os|Ir|Pt|Au|Hg|Tl|Pb|Bi|Po|At|Rn|Fr|Ra|Ac|Th|Pa|Np|Pu|Am|Cm|Bk|Cf|Es|Fm|Md|No|Lr|Rf|Db|Sg|Bh|Hs|Mt|Ds|Rg|Cn|Fl|Lv|Ts|Og)/g;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="12"
          description="Your password must include a two letter symbol from the periodic table."
        />
      ),
      isFollowed,
    };
  },
  function Rule13(input) {
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
    const [moonPhase, setMoonPhase] = useState("🌑");
    // const moonPhaseHandler = useCallback(async function () {
    //   const url =
    //     "https://luna-phase.p.rapidapi.com/Luna_Phase?lat=51.5074&lon=-0.1278";
    //   const options = {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-key":
    //         "998d74b152msh2918a57284edac0p14b823jsne20ebe1c7d0c",
    //       "x-rapidapi-host": "luna-phase.p.rapidapi.com",
    //     },
    //   };

    //   try {
    //     const response = await fetch(url, options);
    //     if (!response.ok) {
    //       throw new Error("Something went wrong :: " + response.status);
    //     }
    //     const result = await response.json();
    //     setMoonPhase(result.Phase_Description);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });
    // useEffect(() => {
    //   moonPhaseHandler();
    // }, [moonPhaseHandler]);

    const reg = new RegExp(moonPhaseObject[moonPhase]);
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="13"
          description="Your password must include the current phase of the moon as an emoji."
        />
      ),
      isFollowed,
    };
  },
  function Rule14(input) {
    let isFollowed = false;
    const countries = [];
    const place = useRef(googleMapList[Math.floor(Math.random() * 64)]);
    const reg = new RegExp(place.current.title, "gi");
    countryNames.map((name) => {
      const reg2 = new RegExp(name, "gi");
      input.match(reg2) && countries.push(name);
    });
    isFollowed = input.match(reg) ? true : false;

    return {
      comp: (
        <Rule
          status={isFollowed}
          description="Your password must include the name of this country."
          index="14"
        >
          {countries && !isFollowed && (
            <div className={styles.marginTop}>
              {countries.map((ele) => {
                return (
                  <div key={ele}>
                    <img
                      src={errorSvg}
                      alt="errorSvg"
                      className={styles.errorSvg}
                    />
                    {ele}
                  </div>
                );
              })}
            </div>
          )}

          <iframe
            className={styles.googlemap}
            src={place.current.embed}
            loading="lazy"
          />
        </Rule>
      ),
      isFollowed,
    };
  },
  function Rule15(input) {
    const reg = /\d+/g;
    const nums = input.match(reg);
    let check = false;
    if (nums) {
      nums.forEach((num) => {
        if (num % 400 == 0) {
          check = true;
        } else if (num % 4 == 0 && num % 100 != 0) {
          check = true;
        }
      });
    }

    const isFollowed = check;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="15"
          description="Your password must include a leap year."
        />
      ),
      isFollowed,
    };
  },
  function Rule16(input) {
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

    const index = useRef(Math.floor(Math.random() * 192));

    if (input.match(reg)) {
      const moves = input.match(reg);
      moves.map((move) => {
        try {
          const chess = new Chess();
          chess.load(chessFens[index.current].fen);
          const validMove = chess.move(move);

          if (validMove) {
            const newReg2 = new RegExp(
              validMove.san.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            );
            if (!move.match(newReg2)) {
              element.push(<p>{move} (Invalid Notation)</p>);
              status = false;
            } else {
              const newReg = new RegExp(
                chessFens[index.current].sol.replace(
                  /[.*+?^${}()|[\]\\]/g,
                  "\\$&"
                ),
                "g"
              );
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
    const isFollowed = status;
    return {
      comp: (
        <Rule status={isFollowed} description={description} index="16">
          <div className={styles["chessboard"]}>
            {element && !isFollowed && (
              <div className={styles.marginTop}>
                {element.map((ele) => {
                  return (
                    <div key={ele}>
                      <img
                        src={errorSvg}
                        alt="errorSvg"
                        className={styles.errorSvg}
                      />
                      {ele}
                    </div>
                  );
                })}
              </div>
            )}
            <img
              src={`https://fen2image.chessvision.ai/${
                chessFens[index.current].fen
              }`}
              alt="Chessboard"
              className={styles["chessboard-img"]}
            />

            {chessFens[index.current].fen.match(/\sb\s/g) ? (
              <p className={styles["chessboard-p"]}>Black to move</p>
            ) : (
              <p className={styles["chessboard-p"]}>White to move</p>
            )}
          </div>
        </Rule>
      ),
      isFollowed,
    };
  },
  function Rule17(input) {
    const reg = /🥚/g;
    const isFollowed = input.match(reg) ? true : false;
    return {
      comp: (
        <Rule
          status={isFollowed}
          index="17"
          description="🥚 ← This is my chicken Paul. He hasn’t hatched yet, please put him in your password and keep him safe."
        />
      ),
      isFollowed,
    };
  },
  function Rule18(input) {
    let status = false;
    function calculateTotalAtomicMass(input) {
      const reg = /[A-Z][a-z]?/g;
      const matches = input.match(reg);
      if (matches) {
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
      } else {
        return 0;
      }
    }

    const totalMass = calculateTotalAtomicMass(input);
    totalMass === 200 ? (status = true) : (status = false);

    const isFollowed = status;

    return {
      comp: (
        <Rule
          status={isFollowed}
          description="The elements in your password must have atomic numbers that add up to 200."
          index="18"
        />
      ),
      isFollowed,
    };
  },
  function Rule22(input) {
    const description = (
      <>
        <p>Your password must contain one of the following affirmations:</p>
        <ul className={styles["unordered-list"]}>
          <li>I am loved</li>
          <li>I am worthy</li>
          <li>I am enough</li>
        </ul>
      </>
    );
    const reg = /I am (loved|worthy|enough)/gi;

    return (
      <Rule
        status={input.match(reg) ? true : false}
        description={description}
        index="22"
      />
    );
  },
  function Rule24(input) {
    const [status, setStatus] = useState(false);
    const [callStatus, setCallStatus] = useState(false);
    let player;

    useEffect(() => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);

      if (callStatus) {
        window.onYouTubeIframeAPIReady = () => {
          player = new window.YT.Player("player", {
            videoId: videoID,
            events: {
              onReady: (event) => {
                checkDuration();
              },
            },
          });
        };
      }
    }, [input]);

    const minutes = Math.round(Math.random() * 33 + 3);
    const seconds = Math.round(Math.random() * 59);

    const regex =
      /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})|(?:https?:\/\/www\.)?youtube\.com\/watch\?v\=([a-zA-Z0-9_-]{11})/;

    const match = input.match(regex);

    if (match) {
      var videoID = match[1] || match[2];
      setCallStatus(true);
    } else {
      setCallStatus(false);
      setStatus(false);
    }

    function checkDuration() {
      const duration = player.getDuration();
      if (minutes === Math.floor(duration / 60) && seconds === duration % 60)
        setStatus(true);
    }
    return (
      <Rule
        status={status}
        description={`Your password must include the URL of a ${minutes} minute ${
          seconds ? `${seconds} seconds` : ""
        } long YouTube video. `}
        index="24"
      >
        <div id="player" className={styles.player} />
      </Rule>
    );
  },
  function Rule28(input) {
    const [hexCode, sethexCode] = useState(generateRandomHexColor());

    const isFollowed = input === hexCode ? true : false;

    function generateRandomHexColor() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor.padStart(6, "0")}`;
    }
    function hexCodeChanger() {
      sethexCode(generateRandomHexColor());
    }

    return (
      <Rule
        status={isFollowed}
        index="28"
        description="Your password must include this color in hex"
      >
        <div className={styles.hexBox} style={{ backgroundColor: { hexCode } }}>
          <img
            src={refresh}
            alt="refresh"
            className={styles["hexBox-refresh"]}
            onClick={hexCodeChanger}
          />
        </div>
      </Rule>
    );
  },
];

export default RulesList;
