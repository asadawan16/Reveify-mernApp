const checkPalindrome = (str) => {
  const newstring = str.toLowerCase();

  let Forwardcheck = [];
  let backwardcheck = [];
  let ForwardARRAY = [];
  let backwardArray = [];
  for (i = 0; i < newstring.length; i++) {
    Forwardcheck.push(newstring[i]);
    ForwardARRAY = Forwardcheck.filter(
      (i) => i !== "," && i !== " " && i !== "'"
    );
  }
  for (i = newstring.length - 1; i >= 0; i--) {
    backwardcheck.push(newstring[i]);
    backwardArray = backwardcheck.filter(
      (i) => i !== "," && i !== " " && i !== "'"
    );
  }
  console.log("forward   " + ForwardARRAY.toString());
  console.log("backward   " + backwardArray.toString());
  if (ForwardARRAY.toString() === backwardArray.toString()) {
    return true;
  } else {
    return false;
  }
};

const word = "Madam,4'm Adam";
const word2 = "Step ff pets";
const word3 = "Radar, o- radar";
const result = checkPalindrome(word);
const result2 = checkPalindrome(word2);
const result3 = checkPalindrome(word3);

console.log("Word 1 :" + result);
console.log("Word 2 :" + result2);
console.log("Word 3 :" + result3);
