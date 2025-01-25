import periodicTable from "./periodicTable.js";

let matches = "jdsfkjHejflajNa701985019la".match(/[A-Z][a-z]/g);
Object.keys(periodicTable).map((ele) => {
  matches.map((ele2) => {
    if (ele === ele2) console.log("done");
  });
});
