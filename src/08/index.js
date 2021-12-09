import { intersection, isEqual, pull, sortBy, add } from 'lodash';

export const formatInput = input => {
  input = input.split('\n');
  console.log({ input });
  return input;
};

const getDigits = entries => {
  //comment to test with the example
  let digitsArray = [];
  entries.forEach(str => {
    digitsArray.push(str.split('|')[1].substring(1));
  });

  let digits = [];
  digitsArray.forEach(str => {
    let digitsForThisArray = str.split(' ');
    digitsForThisArray.forEach(digit => {
      digits.push(digit);
    });
  });
  return digits;
};

const count147And8 = digits => {
  let count = 0;
  digits.forEach(digit => {
    if (
      digit.length === 2 ||
      digit.length === 4 ||
      digit.length === 3 ||
      digit.length === 7
    ) {
      count += 1;
    }
  });
  return count;
};

export const partOne = input => {
  return count147And8(getDigits(input));
};

export const partTwo = input => {
  let arrayOfTenUniqueSignalPatterns = getArrayOfTenUniqueSignalPatterns(input);

  let arrayOfArrayOfSIgnalPatternsAsString =
    getArrayOfArrayOfSIgnalPatternsAsString(arrayOfTenUniqueSignalPatterns);

  let arrayOfFourOutputDigits = getOutputDigitsForEachEntry(input);

  let arrayOfArrayOfOutputDIgitsAsSTring = getArrayOfOutputDIgitsAsSTring(
    arrayOfFourOutputDigits,
  );

  let patternsForEachFiguresForEachEntry = [];
  for (let i = 0; i < arrayOfArrayOfSIgnalPatternsAsString.length; i++) {
    patternsForEachFiguresForEachEntry.push(
      getPatternsForEachFigures(arrayOfArrayOfSIgnalPatternsAsString[i]),
    );
  }

  return getFinalOutPut(
    arrayOfArrayOfOutputDIgitsAsSTring,
    patternsForEachFiguresForEachEntry,
  );
};

const getArrayOfTenUniqueSignalPatterns = entries => {
  let arrayOfTenUniqueSignalPatterns = [];
  entries.forEach(str => {
    arrayOfTenUniqueSignalPatterns.push(str.split('|')[0].slice(0, -1));
  });
  return arrayOfTenUniqueSignalPatterns;
};

const getOutputDigitsForEachEntry = entries => {
  let arrayOfFourOutputDigits = [];
  entries.forEach(str => {
    arrayOfFourOutputDigits.push(str.split('|')[1].substring(1));
  });
  return arrayOfFourOutputDigits;
};

const getArrayOfArrayOfSIgnalPatternsAsString =
  arrayOfTenUniqueSignalPatterns => {
    let arrayOfArrayOfSIgnalPatternsAsString = [];
    arrayOfTenUniqueSignalPatterns.forEach(tenUniqueSignalPatterns => {
      arrayOfArrayOfSIgnalPatternsAsString.push(
        tenUniqueSignalPatterns.split(' '),
      );
    });
    return arrayOfArrayOfSIgnalPatternsAsString;
  };

const getArrayOfOutputDIgitsAsSTring = arrayOfFourOutputDigits => {
  let arrayOfArrayOfOutputDIgitsAsSTring = [];
  arrayOfFourOutputDigits.forEach(fourOutputDigits => {
    arrayOfArrayOfOutputDIgitsAsSTring.push(fourOutputDigits.split(' '));
  });
  return arrayOfArrayOfOutputDIgitsAsSTring;
};

const getFinalOutPut = (
  arrayOfArrayOfOutputDIgitsAsSTring,
  patternsForEachFiguresForEachEntry,
) => {
  let finalOuputsArray = [];

  console.log(arrayOfArrayOfOutputDIgitsAsSTring);
  console.log(patternsForEachFiguresForEachEntry);

  for (let i = 0; i < arrayOfArrayOfOutputDIgitsAsSTring.length; i++) {
    let outPutAsArrayOfFigures = [];
    for (let j = 0; j < arrayOfArrayOfOutputDIgitsAsSTring[i].length; j++) {
      for (let k = 0; k < patternsForEachFiguresForEachEntry[i].length; k++) {
        if (
          these2StringsAreEqualInRandomOrder(
            patternsForEachFiguresForEachEntry[i][k],
            arrayOfArrayOfOutputDIgitsAsSTring[i][j],
          )
        ) {
          outPutAsArrayOfFigures.push(k);
          break;
        }
      }
    }
    let outPut = Number(outPutAsArrayOfFigures.join(''));
    console.log(outPut);
    finalOuputsArray.push(outPut);
  }
  return finalOuputsArray.reduce(add, 0);
};

const getPatternsForEachFigures = stringsArray => {
  let patternsForEachFigures = ['', '', '', '', '', '', '', '', '', ''];

  //1
  patternsForEachFigures[1] =
    getStringsWithLengthEqualsX(stringsArray, 2).length == 1
      ? getStringsWithLengthEqualsX(stringsArray, 2)[0]
      : 'error';
  stringsArray = removeThisPatternFromStringArrays(
    stringsArray,
    patternsForEachFigures[1],
  );

  //4
  patternsForEachFigures[4] =
    getStringsWithLengthEqualsX(stringsArray, 4).length == 1
      ? getStringsWithLengthEqualsX(stringsArray, 4)[0]
      : 'error';

  stringsArray = removeThisPatternFromStringArrays(
    stringsArray,
    patternsForEachFigures[4],
  );
  removeThisPatternFromStringArrays(stringsArray, patternsForEachFigures[4]);

  //7
  patternsForEachFigures[7] =
    getStringsWithLengthEqualsX(stringsArray, 3).length == 1
      ? getStringsWithLengthEqualsX(stringsArray, 3)[0]
      : 'error';
  removeThisPatternFromStringArrays(stringsArray, patternsForEachFigures[7]);

  //8
  patternsForEachFigures[8] =
    getStringsWithLengthEqualsX(stringsArray, 7).length == 1
      ? getStringsWithLengthEqualsX(stringsArray, 7)[0]
      : 'error';
  removeThisPatternFromStringArrays(stringsArray, patternsForEachFigures[8]);

  //3
  let possiblePatterns = getStringsWithLengthEqualsX(stringsArray, 5);
  for (let i = 0; i < possiblePatterns.length; i++) {
    let arraysToTest = [patternsForEachFigures[1], possiblePatterns[i]];
    let commonCharacters = getCommonCHaractersIn(arraysToTest);
    if (commonCharacters.length == 2) {
      patternsForEachFigures[3] = possiblePatterns[i];
      removeThisPatternFromStringArrays(
        stringsArray,
        patternsForEachFigures[3],
      );
      break;
    }
  }

  //6
  possiblePatterns = getStringsWithLengthEqualsX(stringsArray, 6);
  for (let i = 0; i < possiblePatterns.length; i++) {
    let arraysToTest = [patternsForEachFigures[1], possiblePatterns[i]];
    let commonCharacters = getCommonCHaractersIn(arraysToTest);
    if (commonCharacters.length == 1) {
      patternsForEachFigures[6] = possiblePatterns[i];
      removeThisPatternFromStringArrays(
        stringsArray,
        patternsForEachFigures[6],
      );
      break;
    }
  }

  //9
  possiblePatterns = getStringsWithLengthEqualsX(stringsArray, 6);
  for (let i = 0; i < possiblePatterns.length; i++) {
    let arraysToTest = [patternsForEachFigures[4], possiblePatterns[i]];
    let commonCharacters = getCommonCHaractersIn(arraysToTest);
    if (commonCharacters.length == 4) {
      patternsForEachFigures[9] = possiblePatterns[i];
      removeThisPatternFromStringArrays(
        stringsArray,
        patternsForEachFigures[9],
      );
      break;
    }
  }

  //0
  patternsForEachFigures[0] = getStringsWithLengthEqualsX(stringsArray, 6)[0];
  removeThisPatternFromStringArrays(stringsArray, patternsForEachFigures[0]);

  //2
  possiblePatterns = getStringsWithLengthEqualsX(stringsArray, 5);
  for (let i = 0; i < possiblePatterns.length; i++) {
    let arraysToTest = [patternsForEachFigures[4], possiblePatterns[i]];
    let commonCharacters = getCommonCHaractersIn(arraysToTest);
    if (commonCharacters.length == 2) {
      patternsForEachFigures[2] = possiblePatterns[i];
      removeThisPatternFromStringArrays(
        stringsArray,
        patternsForEachFigures[2],
      );
      break;
    }
  }

  //5
  patternsForEachFigures[5] = getStringsWithLengthEqualsX(stringsArray, 5)[0];
  removeThisPatternFromStringArrays(stringsArray, patternsForEachFigures[5]);

  return patternsForEachFigures;
};

const removeThisPatternFromStringArrays = (stringsArray, pattern) => {
  pull(stringsArray, pattern);
  return stringsArray;
};

const these2StringsAreEqualInRandomOrder = (str1, str2) => {
  let arrayOfChar1 = str1.split('');
  let arrayOfChar2 = str2.split('');
  let result = isEqual(sortBy(arrayOfChar1), sortBy(arrayOfChar2))
    ? true
    : false;
  return result;
};

const getStringsWithLengthEqualsX = (stringsArray, x) => {
  let strings = [];
  stringsArray.forEach(str => {
    if (str.length == x) {
      strings.push(str);
    }
  });
  return strings;
};

const getCommonCHaractersIn = arrayOfSTrings => {
  let arrayOfarrayCHaracters = [];
  arrayOfSTrings.forEach(str => {
    arrayOfarrayCHaracters.push(str.split(''));
  });
  return intersection(...arrayOfarrayCHaracters);
};

// J avais commencer ce raisonnement , et puis ça n'a pas abouti, mais comme j avais passé
//du temps à l'écrire je l'ai gardé...

// j'appelle chaque segment avec une lettre:
//   aaaa
//  b    c
//  b    c
//   dddd
//  e    f
//  e    f
//   gggg
//

// Pour chaque segment, je sais par rapport à la longueur de chaque string des signaux, si je peux
// les retrouver ou non dans un des patterns.

// Ex: le segment "a" est présent dans la représentation 7-segment du 0,2,3,5,6,7,8,9.
// La lettre qui représente le segment "a" pour une entry donnée est donc présente
// tous dans les patterns qui représentent ces chiffres, c'est à dire les patterns de
// longueur 6 (pour la représentation 7-segment de 0, 6 et 9), 5 (pour la représentation 7-segment
// de  2,3 et 5), 3 (pour la
// représentation 7-segment de  7), et 7 (pour la représentation 7-segment de  8).
//

// Pour trouver la lettre qui représente le segment "a" , je dois retrouver la lettre
// de l'entry qui apparait dans les strings de longueur
// 6,5,3 et 7.

// J'obtiens les conditions suivantes:
//
//   lettre de l'entry qui apparait dans toutes les strings de longueur
// a 6,5,3,7
// b 6,4,5,7
// c 6,2,5,4,3,7
// d 5,4,6,7
// e 6,5,7
// f 6,2,5,4,3,7
// g 6,5,7

//
