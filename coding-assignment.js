const checkStringsAnagram = (a, b) => {
  let str1 = a.toLowerCase();
  let str2 = b.toLowerCase();
  console.log(a, b);
  let noOfChars = 256;
  let count1 = new Array(noOfChars);
  let count2 = new Array(noOfChars);
  for (let i = 0; i < noOfChars; i++) {
    count1[i] = 0;
    count2[i] = 0;
  }

  let i;

  for (i = 0; i < str1.length && i < str2.length; i++) {
    count1[str1[i].charCodeAt(0)]++;
    count2[str2[i].charCodeAt(0)]++;
  }

  if (str1.length != str2.length) return false;

  for (i = 0; i < noOfChars; i++) if (count1[i] != count2[i]) return false;

  return true;
};
console.log(checkStringsAnagram("Astronomer", "Moonstarer"));

function collision(arr) {
  let j = 0;

  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ">") count = count + 1;

    if (arr[i] === "<") j = count + j;
  }

  return j;
}

console.log(collision([">", "<", "<", ">", ">"]));
