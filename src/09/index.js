import { forEach, min, some } from 'lodash';

let lowPoints = [];
let table = [];

export const formatInput = input => {
  input = input.split('\n');
  input = input.map(line => [...line]);
  forEach(input, function (item, i) {
    input[i] = item.map(Number);
  });
  return input;
};

export const partOne = input => {
  table = input;
  let sumOfRiskLevels = 0;
  lowPoints = [];
  forEach(table, function (line, y) {
    forEach(line, function (height, x) {
      let nearbyHeights = [];
      nearbyHeights = getNearbyHeights(x, y);
      if (isALowPoint(x, y, nearbyHeights)) {
        lowPoints.push({ x: x, y: y });
        sumOfRiskLevels += riskLevel(x, y);
      }
    });
  });
  //   console.log(lowPoints);
  return sumOfRiskLevels;
};

export const partTwo = input => {
  table = input;
  lowPoints = getLowPoints(table);
  let basins = [];

  for (let i = 0; i < lowPoints.length; i++) {
    basins[i] = [];
    processThisPoint(lowPoints[i].x, lowPoints[i].y, basins[i]);
  }

  let basinsSizes = [];
  forEach(basins, function (basin) {
    basinsSizes.push(basin.length);
  });

  let orderedBasinsSizes = basinsSizes.sort(function (a, b) {
    return a - b;
  });
  orderedBasinsSizes.reverse();
  console.log(orderedBasinsSizes);
  return orderedBasinsSizes[0] * orderedBasinsSizes[1] * orderedBasinsSizes[2];
};

const processThisPoint = (x, y, basin) => {
  if (pointIsNotInBasin(basin, x, y)) {
    if (height(x, y) < 9) {
      basin.push({ x: x, y: y });
      //   console.log(basin);
      let newPointsToProcess = getNearbyPoints(x, y);
      //   console.log(newPointsToProcess);
      for (let i = 0; i < newPointsToProcess.length; i++) {
        processThisPoint(
          newPointsToProcess[i].x,
          newPointsToProcess[i].y,
          basin,
        );
      }
    }
  }
};

const pointIsNotInBasin = (basin, x, y) => {
  return !some(basin, { x: x, y: y });
};

const getNearbyPoints = (x, y) => {
  let nearbyPoints = [];

  if (y === 0) {
    if (x === 0) {
      nearbyPoints.push({ x: x, y: y + 1 });
      nearbyPoints.push({ x: x + 1, y: y });
    } else if (x === table[0].length - 1) {
      nearbyPoints.push({ x: x, y: y + 1 });
      nearbyPoints.push({ x: x - 1, y: y });
    } else {
      nearbyPoints.push({ x: x - 1, y: y });
      nearbyPoints.push({ x: x + 1, y: y });
      nearbyPoints.push({ x: x, y: y + 1 });
    }
  } else if (y === table.length - 1) {
    if (x === 0) {
      nearbyPoints.push({ x: x, y: y - 1 });
      nearbyPoints.push({ x: x + 1, y: y });
    } else if (x === table[0].length - 1) {
      nearbyPoints.push({ x: x, y: y - 1 });
      nearbyPoints.push({ x: x - 1, y: y });
    } else {
      nearbyPoints.push({ x: x - 1, y: y });
      nearbyPoints.push({ x: x + 1, y: y });
      nearbyPoints.push({ x: x, y: y - 1 });
    }
  } else {
    if (x === 0) {
      nearbyPoints.push({ x: x, y: y - 1 });
      nearbyPoints.push({ x: x, y: y + 1 });
      nearbyPoints.push({ x: x + 1, y: y });
    } else if (x === table[0].length - 1) {
      nearbyPoints.push({ x: x, y: y - 1 });
      nearbyPoints.push({ x: x, y: y + 1 });
      nearbyPoints.push({ x: x - 1, y: y });
    } else {
      nearbyPoints.push({ x: x - 1, y: y });
      nearbyPoints.push({ x: x + 1, y: y });
      nearbyPoints.push({ x: x, y: y - 1 });
      nearbyPoints.push({ x: x, y: y + 1 });
    }
  }
  return nearbyPoints;
};

const height = (x, y) => {
  return table[y][x];
};

const getLowPoints = table => {
  lowPoints = [];

  forEach(table, function (line, y) {
    forEach(line, function (height, x) {
      let nearbyHeights = [];
      nearbyHeights = getNearbyHeights(x, y);
      if (isALowPoint(x, y, nearbyHeights)) {
        lowPoints.push({ x: x, y: y });
      }
    });
  });
  return lowPoints;
};

const getNearbyHeights = (x, y) => {
  let nearbyHeights = [];

  if (y === 0) {
    if (x === 0) {
      nearbyHeights.push(table[y + 1][x]);
      nearbyHeights.push(table[y][x + 1]);
    } else if (x === table[0].length - 1) {
      nearbyHeights.push(table[y + 1][x]);
      nearbyHeights.push(table[y][x - 1]);
    } else {
      nearbyHeights.push(table[y][x - 1]);
      nearbyHeights.push(table[y][x + 1]);
      nearbyHeights.push(table[y + 1][x]);
    }
  } else if (y === table.length - 1) {
    if (x === 0) {
      nearbyHeights.push(table[y - 1][x]);
      nearbyHeights.push(table[y][x + 1]);
    } else if (x === table[0].length - 1) {
      nearbyHeights.push(table[y - 1][x]);
      nearbyHeights.push(table[y][x - 1]);
    } else {
      nearbyHeights.push(table[y][x - 1]);
      nearbyHeights.push(table[y][x + 1]);
      nearbyHeights.push(table[y - 1][x]);
    }
  } else {
    if (x === 0) {
      nearbyHeights.push(table[y - 1][x]);
      nearbyHeights.push(table[y + 1][x]);
      nearbyHeights.push(table[y][x + 1]);
    } else if (x === table[0].length - 1) {
      nearbyHeights.push(table[y - 1][x]);
      nearbyHeights.push(table[y + 1][x]);
      nearbyHeights.push(table[y][x - 1]);
    } else {
      nearbyHeights.push(table[y][x - 1]);
      nearbyHeights.push(table[y][x + 1]);
      nearbyHeights.push(table[y - 1][x]);
      nearbyHeights.push(table[y + 1][x]);
    }
  }
  return nearbyHeights;
};

const isALowPoint = (x, y, nearbyHeights) => {
  let isALowPoint = table[y][x] < min(nearbyHeights) ? true : false;
  return isALowPoint;
};

const riskLevel = (x, y) => {
  return table[y][x] + 1;
};
