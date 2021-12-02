export const formatInput = input => {
  // `
  // 156
  // 176
  // 175
  // 176
  // 183
  // `
  // .split('\n') 👇🏻
  // ['156', '176', '175', '176', '183', '']
  // .filter(line => Boolean(line)) (enlève le dernier élément vide, si existant)
  // ['156', '176', '175', '176', '183']
  // .map(line => Number(line)) 👇🏻
  // [156, 176, 175, 176, 183]
  return input
    .split('\n')
    .filter(line => Boolean(line))
    .map(line => Number(line));
};

export const partOne = input => {
  console.log(input);
  // Là, ton input est le fameux tableau de nombres
  // Le résultat, ne pas oublier de le renvoyer à la fin de la fonction avec un return
  //   return 4;

  let result = 0;
  console.log(input.length);

  let i = 0;
  do {
    if (input[i + 1] > input[i]) {
      result = result + 1;
    }
    i = i + 1;
  } while (i < input.length);

  //   input.forEach(function (element, index) {
  //       const
  //     if (index < (input.length - 1) && element < input[index+1]) {
  //         result += 1;
  //     }

  //   });

  return result;
};

export const partTwo = input => {
  let windows = [];
  let i = 0;
  do {
    windows.push(input[i] + input[i + 1] + input[i + 2]);
    i = i + 1;
  } while (i + 2 < input.length);

  let result = 0;
  i = 0;
  do {
    if (windows[i + 1] > windows[i]) {
      result = result + 1;
    }
    i = i + 1;
  } while (i < windows.length);

  return result;
};
