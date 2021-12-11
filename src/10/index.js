import { forEach, includes, pull } from 'lodash';

let corruptedLinesIndexes = [];
let match = { '(': ')', '[': ']', '{': '}', '<': '>' };

export const formatInput = input => {
  input = input.split('\n').map(line => [...line]);
  return input;
};

export const partOne = input => {
  //   let lines = JSON.parse(JSON.stringify(input));

  let lines = [...input];
  // pourquoi ce clone pointe toujours sur input ??

  forEach(lines, function (line, i) {
    lines[i] = recursiveMatchCheck(line);
  });
  return getSyntaxErrorScore(lines);
};

const recursiveMatchCheck = line => {
  for (let i = 0; i < line.length - 1; i++) {
    if (match[line[i]] === line[i + 1]) {
      line.splice(i, 2);

      recursiveMatchCheck(line);
      break;
    }
  }
  return line;
};

const getSyntaxErrorScore = table => {
  let syntaxErrorScore = 0;
  let closingCharacters = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  forEach(table, function (line, i) {
    for (let j = 0; j < line.length; j++) {
      if (line[j] in closingCharacters) {
        syntaxErrorScore += closingCharacters[line[j]];
        corruptedLinesIndexes.push(i);
        break;
      }
    }
  });
  return syntaxErrorScore;
};

export const partTwo = input => {
  let lines = [...input];
  console.log(lines.length);
  console.log(corruptedLinesIndexes);
  for (var i = corruptedLinesIndexes.length - 1; i >= 0; i--) {
    lines.splice(corruptedLinesIndexes[i], 1);
  }
  let completionStrings = getCompletionStrings(lines);
  return completionStrings;
};

const getCompletionStrings = reducedLines => {
  let completionStrings = [];
  forEach(reducedLines, function (line, i) {
    let completionString = [];
    forEach(line, function (openSymbol, j) {
      completionString.push(match[line[j]]);
    });
    completionStrings.push(completionString.reverse());
  });

  let scores = [];
  forEach(completionStrings, function (completionString, i) {
    scores.push(getScoreFOrThisString(completionString));
  });
  console.log(scores.sort());
  let orderedScores = scores.sort(function (a, b) {
    return a - b;
  });
  return orderedScores[(scores.length - 1) / 2];
};

const getScoreFOrThisString = completionString => {
  let scores = { ')': 1, ']': 2, '}': 3, '>': 4 };
  let score = 0;
  forEach(completionString, function (symbol, i) {
    score = score * 5 + scores[symbol];
  });
  return score;
};
