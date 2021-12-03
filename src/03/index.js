export const formatInput = input => {
  return input.split('\n').filter(line => Boolean(line));
};

const createBitsAtRowArray = arrayOfStrings => {
  let l = arrayOfStrings[0].length;
  let result = [];
  let i = 0;
  do {
    result[i] = [];
    i = i + 1;
  } while (i < l);

  i = 0;
  do {
    arrayOfStrings.forEach(str => {
      if (str.length != l) {
        console.log(
          "les nombres ne sont pas tous de la même taille -> erreur dans l'input",
        );
        //   break;
        // pourquoi ce break me casse tout même si je ne passe pas jamais dans cette condition?
      }
      result[i].push(parseInt(str.charAt(i), 10));
    });
    i = i + 1;
  } while (i < l);
  return result;
};

const getGammaAndEpsilonRates = bitsAtRowArray => {
  let gammaRateAsArray = [];
  let epsilonRateAsArray = [];
  bitsAtRowArray.forEach(row => {
    var countOf0 = 0;
    var countOf1 = 0;
    for (var i = 0; i < row.length; ++i) {
      if (row[i] == 0) {
        countOf0++;
      }
      if (row[i] == 1) {
        countOf1++;
      }
    }
    if (countOf0 > countOf1) {
      gammaRateAsArray.push(0);
      epsilonRateAsArray.push(1);
    } else {
      gammaRateAsArray.push(1);
      epsilonRateAsArray.push(0);
    }
  });
  // On compte les 1 ou 0 majoritaires pour établir les gamma et epsilon comme array de 1 et 0
  let result = {
    gamma: parseArray(gammaRateAsArray),
    epsilon: parseArray(epsilonRateAsArray),
  };
  // j'utilise la fonction parseArray pour obtenir un nombre décimal à partir d'un array de 1 et 0
  //   https://www.tutorialspoint.com/convert-an-array-of-binary-numbers-to-corresponding-integer-in-javascript
  return result;
};

const parseArray = arr => {
  const binaryString = arr.join('');
  return parseInt(binaryString, 2);
};

export const partOne = input => {
  console.log(input);
  // ['00100', '11110','10110', '10111', ... ]

  let bitsAtRowArray = createBitsAtRowArray(input);
  //  On fait une array d'arrays qui listent tous les 1er chiffres , puis tous les 2éme, etc...
  // [[0, 1, 1, 1, 1,0, 0, 1, 1, 1,0, 0],[0, 1, 0, 0, 0,1, 0, 1, 0, 1,0, 1],...]

  let gammaAndEpsilonRates = getGammaAndEpsilonRates(bitsAtRowArray);
  // { gamma: 22, epsilon: 9 }
  console.log(gammaAndEpsilonRates);

  let powerConsumption =
    gammaAndEpsilonRates.gamma * gammaAndEpsilonRates.epsilon;
  return powerConsumption;
};

const getMostCommonValueInThisPosition = (
  bitsAtRowArray,
  position,
  ratingType,
) => {
  var countOf0 = 0;
  var countOf1 = 0;
  //   console.log('bitsAtRowArray[position]:');
  //   console.log(bitsAtRowArray[position]);
  for (var i = 0; i < bitsAtRowArray[position].length; ++i) {
    if (bitsAtRowArray[position][i] == 0) {
      countOf0++;
    }
    if (bitsAtRowArray[position][i] == 1) {
      countOf1++;
    }
  }
  if (countOf0 > countOf1) {
    return ratingType === 'oxygen' ? 0 : 1;
  }
  if (countOf0 < countOf1) {
    return ratingType === 'oxygen' ? 1 : 0;
  } else {
    return ratingType === 'oxygen' ? 1 : 0;
  }
};

const getRatings = (input, ratingType) => {
  let l = input[0].length;
  let i = 0;
  let result = input;
  do {
    let mostCommonValue = getMostCommonValueInThisPosition(
      createBitsAtRowArray(result),
      i,
      ratingType,
    );
    result = result.filter(str => parseInt(str.charAt(i)) === mostCommonValue);
    if (result.length === 1) {
      return result;
    } else {
      i = i + 1;
    }
  } while (i < l);
};

export const partTwo = input => {
  let oxygenRatingAsBinary = getRatings(input, 'oxygen');

  let co2RatingAsBinary = getRatings(input, 'CO2');

  let oxygenRating = parseInt(oxygenRatingAsBinary, 2);

  let co2Rating = parseInt(co2RatingAsBinary, 2);

  return oxygenRating * co2Rating;
};
