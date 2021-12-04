export const formatInput = input => {
  input = input.split('\n');
  return input;
};

const getDrawnNumbers = input => {
  var result = input[0].split(',');
  result = result.map(x => parseInt(x));
  return result;
};

const getBingoCards = input => {
  var bingoCards = [];

  for (var i = 0; i < input.length; i++) {
    if (input[i].length === 0) {
      var card = [];

      for (var j = 1; j < 6; j++) {
        var horizontalLine = input[i + j]
          .split(' ')
          // https://stackoverflow.com/questions/20169809/pushing-each-word-to-an-array
          .filter(function (str) {
            return /\S/.test(str);
            // https://stackoverflow.com/questions/20668872/remove-whitespace-only-array-elements
          })
          .map(x => parseInt(x));

        card.push(horizontalLine);
      }
      console.log('card:');
      console.log(card);
      for (var k = 0; k < 5; k++) {
        var verticalLine = [];
        for (var j = 0; j < 5; j++) {
          verticalLine.push(card[j][k]);
        }
        card.push(verticalLine);
      }

      bingoCards.push(card);
    }
  }
  return bingoCards;
};

const sumOfAllUnmarkedNumbersOnCard = (card, actuallyDrawnNumbers) => {
  var sum = 0;
  for (var i = 0; i < card.length / 2; i++) {
    for (var j = 0; j < card[i].length; j++) {
      if (!actuallyDrawnNumbers.includes(card[i][j])) {
        sum = sum + card[i][j];
      }
    }
  }
  return sum;
};

export const partOne = input => {
  var drawnNumbers = getDrawnNumbers(input);
  var bingoCards = getBingoCards(input);

  for (var k = 4; k < drawnNumbers.length; k++) {
    for (var i = 0; i < bingoCards.length; i++) {
      for (var j = 0; j < bingoCards[i].length; j++) {
        let checker = (arr, target) => target.every(v => arr.includes(v));
        // https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array

        const alreadyDrawnNumbers = drawnNumbers.slice(0, k + 1);

        if (checker(alreadyDrawnNumbers, bingoCards[i][j])) {
          console.log('sumOfAllUnmarkedNumbersOnCard:');
          console.log(
            sumOfAllUnmarkedNumbersOnCard(bingoCards[i], alreadyDrawnNumbers),
          );

          let result =
            drawnNumbers[k] *
            sumOfAllUnmarkedNumbersOnCard(bingoCards[i], alreadyDrawnNumbers);

          return result;
        }
      }
    }
  }
};

export const partTwo = input => {
  var drawnNumbers = getDrawnNumbers(input);
  var bingoCards = getBingoCards(input);
  let listOfAlreadyWinningBoards = [];

  for (var k = 4; k < drawnNumbers.length; k++) {
    for (var i = 0; i < bingoCards.length; i++) {
      for (var j = 0; j < bingoCards[i].length; j++) {
        let checker = (arr, target) => target.every(v => arr.includes(v));
        // https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array

        const alreadyDrawnNumbers = drawnNumbers.slice(0, k + 1);

        if (checker(alreadyDrawnNumbers, bingoCards[i][j])) {
          if (!listOfAlreadyWinningBoards.includes(i)) {
            listOfAlreadyWinningBoards.push(i);

            if (listOfAlreadyWinningBoards.length == bingoCards.length) {
              let result =
                drawnNumbers[k] *
                sumOfAllUnmarkedNumbersOnCard(
                  bingoCards[i],
                  alreadyDrawnNumbers,
                );
              return result;
            }
          }
        }
      }
    }
  }
};
