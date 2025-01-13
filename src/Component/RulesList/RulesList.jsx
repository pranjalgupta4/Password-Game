import Rule from "../Rule";
import pepsi from "../../public/Sponsers/pepsi.svg";
import shell from "../../public/Sponsers/shell.svg";
import starbucks from "../../public/Sponsers/starbucks.svg";
// import googleMapList from "./googleMapList";

const rulesList = [
  function rule2(input) {
    const reg = /\d/g;
    return (
      <Rule
        status={input.match(/\d/g) ? true : false}
        index="2"
        description="Your password must include a number."
      />
    );
  },
  function rule4(input) {
    const reg = /\w|\s/g;
    return (
      <Rule
        status={input.match(reg) ? false : true}
        index="4"
        description="Your password must include a special character."
      />
    );
  },
  function rule6(input) {
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
  function rule8(input) {
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
  function rule10(input) {
    const reg =
      /(January|February|March|April|May|June|July|August|September|October|November|December)/gi;
    return (
      <Rule
        status={input.match(reg) ? true : false}
        index="10"
        description="Your password must include this CAPTCHA:"
      />
    );
  },
  function rule12(input) {
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
  function rule14(input) {
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
