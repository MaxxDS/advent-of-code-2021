import { forEach, intersection, filter, some, cloneDeep } from 'lodash';

export const formatInput = input => {
  input = input.split('\n').map(line => [...line]);
  forEach(input, function (item, i) {
    input[i] = item.map(Number);
  });
  return input;
};

let numberOfFLashes = 0;
let allOctopussesEnergies = [];
let allFlashesSYnch = false;
let answer2 = 0;

export const partOne = input => {
  allOctopussesEnergies = cloneDeep(input);
  return numberOfFlashesAfterNSteps(allOctopussesEnergies, 500);
};

const numberOfFlashesAfterNSteps = (allOctopussesEnergies, n) => {
  for (let i = 1; i < n + 1; i++) {
    let octopussesThatFlashedAlreadyInThisStep = [];
    // console.log({ allOctopussesEnergies });
    forEach(allOctopussesEnergies, function (line, y) {
      forEach(line, function (octopusEnergy, x) {
        allOctopussesEnergies[y][x] = allOctopussesEnergies[y][x] + 1;
      });
    });
    // console.log({ allOctopussesEnergies });
    let octopussesWithEnergyAbove9 = getOctopussesWithEnergyAbove9(
      allOctopussesEnergies,
    );

    recursiveFlashes(
      octopussesWithEnergyAbove9,
      octopussesThatFlashedAlreadyInThisStep,
    );

    forEach(
      octopussesThatFlashedAlreadyInThisStep,
      function (octopusThatFlashed, i) {
        allOctopussesEnergies[octopusThatFlashed.y][octopusThatFlashed.x] = 0;
      },
    );

    if (
      allOctopussesEnergies[0].length * allOctopussesEnergies.length ===
        octopussesThatFlashedAlreadyInThisStep.length &&
      !allFlashesSYnch
    ) {
      allFlashesSYnch = true;
      console.log(allFlashesSYnch);
      console.log(i);
      console.log(allOctopussesEnergies);
      answer2 = i;
    }
  }
  return numberOfFLashes;
};

const getOctopussesWithEnergyAbove9 = octopussesEnergies => {
  let octopussesWithEnergyAbove9 = [];
  forEach(octopussesEnergies, function (line, y) {
    forEach(line, function (octopusEnergy, x) {
      if (octopusEnergy > 9) {
        octopussesWithEnergyAbove9.push({ x: x, y: y });
      }
    });
  });
  return octopussesWithEnergyAbove9;
};

const recursiveFlashes = (
  octopussesWithEnergyAbove9,
  octopussesThatFlashedAlreadyInThisStep,
) => {
  forEach(octopussesWithEnergyAbove9, function (octopusWithEnergyAbove9, i) {
    if (
      !some(octopussesThatFlashedAlreadyInThisStep, octopusWithEnergyAbove9)
    ) {
      let octopusThatFlashes = octopusWithEnergyAbove9;
      numberOfFLashes = numberOfFLashes + 1;
      octopussesThatFlashedAlreadyInThisStep.push(octopusThatFlashes);
      let nearByOctopusses = getNearbyOctopusses(
        octopusThatFlashes.x,
        octopusThatFlashes.y,
        allOctopussesEnergies,
      );
      forEach(nearByOctopusses, function (nearByOctopus, i) {
        allOctopussesEnergies[nearByOctopus.y][nearByOctopus.x] += 1;
        octopussesWithEnergyAbove9 = getOctopussesWithEnergyAbove9(
          allOctopussesEnergies,
        );
        recursiveFlashes(
          octopussesWithEnergyAbove9,
          octopussesThatFlashedAlreadyInThisStep,
        );
      });
    }
  });
};

const octopusEnergy = (x, y) => {
  return allOctopussesEnergies[y][x];
};

const getNearbyOctopusses = (x, y, table) => {
  let nearbyOctopusses = [];

  if (y === 0) {
    if (x === 0) {
      nearbyOctopusses.push({ x: x, y: y + 1 });
      nearbyOctopusses.push({ x: x + 1, y: y });
      nearbyOctopusses.push({ x: x + 1, y: y + 1 });
    } else if (x === table[0].length - 1) {
      nearbyOctopusses.push({ x: x, y: y + 1 });
      nearbyOctopusses.push({ x: x - 1, y: y });
      nearbyOctopusses.push({ x: x - 1, y: y + 1 });
    } else {
      nearbyOctopusses.push({ x: x - 1, y: y });
      nearbyOctopusses.push({ x: x + 1, y: y });
      nearbyOctopusses.push({ x: x, y: y + 1 });
      nearbyOctopusses.push({ x: x - 1, y: y + 1 });
      nearbyOctopusses.push({ x: x + 1, y: y + 1 });
    }
  } else if (y === table.length - 1) {
    if (x === 0) {
      nearbyOctopusses.push({ x: x, y: y - 1 });
      nearbyOctopusses.push({ x: x + 1, y: y });
      nearbyOctopusses.push({ x: x + 1, y: y - 1 });
    } else if (x === table[0].length - 1) {
      nearbyOctopusses.push({ x: x, y: y - 1 });
      nearbyOctopusses.push({ x: x - 1, y: y });
      nearbyOctopusses.push({ x: x - 1, y: y - 1 });
    } else {
      nearbyOctopusses.push({ x: x - 1, y: y });
      nearbyOctopusses.push({ x: x + 1, y: y });
      nearbyOctopusses.push({ x: x, y: y - 1 });
      nearbyOctopusses.push({ x: x - 1, y: y - 1 });
      nearbyOctopusses.push({ x: x + 1, y: y - 1 });
    }
  } else {
    if (x === 0) {
      nearbyOctopusses.push({ x: x, y: y - 1 });
      nearbyOctopusses.push({ x: x, y: y + 1 });
      nearbyOctopusses.push({ x: x + 1, y: y });
      nearbyOctopusses.push({ x: x + 1, y: y - 1 });
      nearbyOctopusses.push({ x: x + 1, y: y + 1 });
    } else if (x === table[0].length - 1) {
      nearbyOctopusses.push({ x: x, y: y - 1 });
      nearbyOctopusses.push({ x: x, y: y + 1 });
      nearbyOctopusses.push({ x: x - 1, y: y });
      nearbyOctopusses.push({ x: x - 1, y: y + 1 });
      nearbyOctopusses.push({ x: x - 1, y: y - 1 });
    } else {
      nearbyOctopusses.push({ x: x - 1, y: y });
      nearbyOctopusses.push({ x: x - 1, y: y - 1 });
      nearbyOctopusses.push({ x: x - 1, y: y + 1 });
      nearbyOctopusses.push({ x: x + 1, y: y });
      nearbyOctopusses.push({ x: x + 1, y: y - 1 });
      nearbyOctopusses.push({ x: x + 1, y: y + 1 });
      nearbyOctopusses.push({ x: x, y: y - 1 });
      nearbyOctopusses.push({ x: x, y: y + 1 });
    }
  }
  return nearbyOctopusses;
};

export const partTwo = () => {
  return answer2;
};
