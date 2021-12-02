export const formatInput = input => {
  return input
    .split('\n')
    .filter(line => Boolean(line))
    .map(createInstructionPair);
  // let commmandPairs = strings.map(string => [(string.split(' '))[0],(string.split(' '))[1]);
  // Pourquoi la ligne du dessus ne fonctionne pas ?
};

const createInstructionPair = str => {
  let direction = str.split(' ')[0];
  let strenght = parseInt(str.split(' ')[1]);
  return [direction, strenght];
};

export const partOne = input => {
  console.log(input);

  let x = 0;
  let y = 0;
  //   let i = 0;

  //   console.log(input[0]);
  //   console.log(input[0][0] === 'forward');
  //   console.log(input[1]);
  input.forEach(instructionPair => {
    switch (instructionPair[0]) {
      case 'forward':
        x = x + instructionPair[1];
        break;
      case 'down':
        y = y - instructionPair[1];
        break;
      case 'up':
        y = y + instructionPair[1] > 0 ? 0 : y + instructionPair[1];
        break;
      default:
        console.log('something went wrong');
    }
  });

  let result = x * -y;
  return result;
};

export const partTwo = () => {};
