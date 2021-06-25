function isPalindrome (word) {
word = word.toLowerCase();
word = word.split(' ').join('');
let monkey = word.split("").reverse().join('');
return word === monkey;
}


console.log(isPalindrome('Dogma I am God'));
