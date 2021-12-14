import { forEach, cloneDeep, slice, uniqWith, isEqual, max } from 'lodash';

let dots = [];
let instructions = [];

export const formatInput = input => {
  input = input.split('\n');

  for (var i = 0; i < input.length; i++) {
    if (input[i] === '') {
      break;
    }
    input[i] = input[i].match(/\d+/g).map(x => parseInt(x));
  }

  for (var i = input.length; i > 0; i--) {
    if (input[i] === '') {
      dots = cloneDeep(input);
      dots = slice(dots, 0, i);
      instructions = cloneDeep(input);
      instructions = slice(instructions, i + 1, instructions.length);

      forEach(instructions, function (instruction, j) {
        instructions[j] = {
          direction: instruction.substr(11, 1),
          line: parseInt(instruction.substr(13, instruction.length), 10),
        };
      });
    }
  }

  return input;
};

export const partOne = () => {
  return fold(dots, instructions).length;
};

export const partTwo = () => {
  let finalDots = fold(dots, instructions);
  let drawing = [];

  let arrayOfX = [];
  let arrayOfY = [];
  forEach(finalDots, function (dot, i) {
    arrayOfX.push(dot[0]);
    arrayOfY.push(dot[1]);
  });

  console.log(max(arrayOfX));

  for (let i = 0; i < max(arrayOfY) + 1; i++) {
    drawing.push([]);
    for (let j = 0; j < max(arrayOfX) + 1; j++) {
      drawing[i].push('.');
    }
  }

  forEach(finalDots, function (dot, i) {
    drawing[dot[1]][dot[0]] = '#';
  });

  drawing.forEach(line => {
    console.log(line.join('').replace('.', ' '));
    console.log();
  });
};

const fold = (dots, instructions) => {
  let newDots = [];
  forEach(instructions, function (instruction, i) {
    //   uncomment for PartOne
    // if (i === 0) {
    forEach(dots, function (dot, j) {
      let direction = instruction.direction;
      let line = instruction.line;

      switch (direction) {
        case 'x':
          dot[0] = dot[0] > line ? line - (dot[0] - line) : dot[0];
          break;
        case 'y':
          dot[1] = dot[1] > line ? line - (dot[1] - line) : dot[1];
          break;
        default:
          console.log('something went wrong');
          break;
      }
      newDots.push(dot);
    });
    // }
  });
  dots = uniqWith(newDots, isEqual);
  return dots;
};
