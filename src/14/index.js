import { forEach, countBy, cloneDeep } from 'lodash';

let startPolymer = '';
let insertions = [];
let letterOccurrences = {};

export const formatInput = input => {
  input = input.split('\n');
  startPolymer = input[0];

  for (var i = 2; i < input.length; i++) {
    let insertion = { pair: '', element: '' };

    insertion.pair = input[i].substring(0, 2);
    insertion.element = input[i].substring(input[i].length - 1);

    insertions.push(insertion);
  }
};

export const partOne = () => {
  letterOccurrences = initOccurrences(startPolymer);
  return resultAfterNSteps(startPolymer, insertions, 10);
};

export const partTwo = () => {
  letterOccurrences = initOccurrences(startPolymer);
  return resultAfterNSteps(startPolymer, insertions, 40);
};

const resultAfterNSteps = (startPolymer, insertions, n) => {
  let polymer = initPolymer(startPolymer, insertions);
  for (let i = 0; i < n; i++) {
    polymer = processOneStep(polymer);
  }
  return result(polymer);
};

const initPolymer = (startPolymer, insertions) => {
  let polymer = {};
  for (let i = 0; i < startPolymer.length - 1; i++) {
    let pair = startPolymer.substring(i, i + 2);
    polymer[pair] = (Number(polymer[pair]) || 0) + 1;
  }
  return polymer;
};

const initOccurrences = startPolymer => {
  let array = startPolymer.split('');
  return countBy(array);
};

const processOneStep = polymer => {
  let temp = {};

  forEach(polymer, function (value, key) {
    let keyElements = key.split('');

    let newELement = insertions.find(x => x.pair === key).element;
    letterOccurrences[newELement] =
      (Number(letterOccurrences[newELement]) || 0) + polymer[key];

    temp[`${keyElements[0]}${newELement}`] =
      (Number(temp[`${keyElements[0]}${newELement}`]) || 0) + polymer[key];

    temp[`${newELement}${keyElements[1]}`] =
      (Number(temp[`${newELement}${keyElements[1]}`]) || 0) + polymer[key];
  });

  return temp;
};

const result = polymer => {
  let arr = Object.values(letterOccurrences);
  let min = Math.min(...arr);
  let max = Math.max(...arr);
  return max - min;
};
