import { min, max } from 'lodash';
// import { keys } from 'lodash';

export const formatInput = input => {
  input = input.split(',').map(x => parseInt(x));
  return input;
};

export const partOne = input => {
  let fuelCostForHorizontalPosition = {};
  let positionMax = max(input);
  console.log({ positionMax });
  for (let i = 0; i <= positionMax; i++) {
    var fuelCostForThisHorizontalPosition = 0;
    for (let j = 0; j < input.length; j++) {
      let distance = Math.abs(i - input[j]);
      fuelCostForThisHorizontalPosition =
        fuelCostForThisHorizontalPosition + distance;
    }
    fuelCostForHorizontalPosition[i] = fuelCostForThisHorizontalPosition;
  }
  console.log({ input });
  console.log({ fuelCostForHorizontalPosition });
  const arr = Object.values(fuelCostForHorizontalPosition);
  const minValue = min(arr);
  return minValue;
};

export const partTwo = input => {
  let fuelCostForHorizontalPosition = {};
  let positionMax = max(input);
  console.log({ positionMax });
  for (let i = 0; i <= positionMax; i++) {
    var fuelCostForThisHorizontalPosition = 0;
    for (let j = 0; j < input.length; j++) {
      let distance = Math.abs(i - input[j]);
      for (let k = 1; k <= distance; k++) {
        fuelCostForThisHorizontalPosition =
          fuelCostForThisHorizontalPosition + k;
      }
    }
    fuelCostForHorizontalPosition[i] = fuelCostForThisHorizontalPosition;
  }
  console.log({ input });
  console.log({ fuelCostForHorizontalPosition });
  const arr = Object.values(fuelCostForHorizontalPosition);
  const minValue = min(arr);
  return minValue;
};
