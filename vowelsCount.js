const string="thoughtworks";
let vowelCount=0;
const vowelSet = "aeiou";
const stringLength = string.length;
const vowelSetLength = vowelSet.length;
for(let stringIndex = 0 ; stringIndex < stringLength ; stringIndex++) {
    for (let vowelSetIndex = 0 ; vowelSetIndex < vowelSetLength ; vowelSetIndex++) {
        if ( string[stringIndex] === vowelSet[vowelSetIndex]) {
            vowelCount++;
            break;
        }
    }
}
console.log("number of vowels present in",string,"are",vowelCount);
