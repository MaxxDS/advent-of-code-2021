export const formatInput = input => {
  input = input.split('\n');

  for (var i = 0; i < input.length; i++) {
    input[i] = input[i]
      // https://www.encodedna.com/javascript/how-to-get-numbers-from-a-string-in-javascript.htm
      .match(/\d+/g)
      .map(x => parseInt(x));
  }
  return input;
};

const getOnlyHorizontalAndVerticalLines = input => {
  var result = [];
  for (var i = 0; i < input.length; i++) {
    // "only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2."
    if (input[i][0] === input[i][2] || input[i][1] === input[i][3]) {
      result.push(input[i]);
    }
  }
  return result;
};

const getHorizontalAndVerticalAndDiagonalLines = input => {
  var result = [];
  for (var i = 0; i < input.length; i++) {
    // Pour etre une diag il faut que valeur absolue(x1-x2) = valeur absolue(y1-y2)
    if (
      input[i][0] === input[i][2] ||
      input[i][1] === input[i][3] ||
      Math.abs(input[i][0] - input[i][2]) ===
        Math.abs(input[i][1] - input[i][3])
    ) {
      result.push(input[i]);
    }
  }
  return result;
};

const getAllCoveredPoints = lines => {
  var coveredPoints = [];
  for (var i = 0; i < lines.length; i++) {
    if (lines[i][0] === lines[i][2]) {
      // line is vertical
      let x = lines[i][0];
      let y1y2 = [lines[i][1], lines[i][3]];
      let yMax = Math.max(...y1y2);
      let yMin = Math.min(...y1y2);

      for (var j = yMin; j <= yMax; j++) {
        let coveredPoint = [x, j];
        coveredPoints.push(coveredPoint);
      }
    } else if (lines[i][1] === lines[i][3]) {
      // line is horizontal
      let y = lines[i][1];
      let x1x2 = [lines[i][0], lines[i][2]];
      let xMax = Math.max(...x1x2);
      let xMin = Math.min(...x1x2);
      for (var j = xMin; j <= xMax; j++) {
        let coveredPoint = [j, y];
        coveredPoints.push(coveredPoint);
      }
    } else if (
      Math.abs(lines[i][0] - lines[i][2]) ===
      Math.abs(lines[i][1] - lines[i][3])
    ) {
      // line is diagonal
      for (var j = 0; j <= Math.abs(lines[i][0] - lines[i][2]); j++) {
        let x1 = lines[i][0];
        let x2 = lines[i][2];
        let y1 = lines[i][1];
        let y2 = lines[i][3];
        let x = 0;
        let y = 0;
        if (x2 > x1) {
          x = x1 + j;
        } else {
          x = x1 - j;
        }
        if (y2 > y1) {
          y = y1 + j;
        } else {
          y = y1 - j;
        }
        let coveredPoint = [x, y];
        coveredPoints.push(coveredPoint);
      }
    }
  }
  return coveredPoints;
};

// formule magique trouvée sur https://jsbin.com/mebiwa/1/edit?js,console
const getCrossPoints = array => {
  var map = array.reduce(function (obj, b) {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});

  var obj = map;
  // https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
  var result = Object.entries(obj);
  return result;
};

const getNumberOfOverlaps = object => {
  //  https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
  let number = 0;

  for (let [key, value] of Object.entries(object)) {
    if (value[1] >= 2) {
      number = number + 1;
    }
  }
  return number;
};

export const partOne = input => {
  let horizontalAndVerticalLines = getOnlyHorizontalAndVerticalLines(input);
  let coveredPoints = getAllCoveredPoints(horizontalAndVerticalLines);
  let crossPoints = getCrossPoints(coveredPoints);
  let numberOfOverlaps = getNumberOfOverlaps(crossPoints);
  return numberOfOverlaps;
};

export const partTwo = input => {
  let horizontalAndVerticalAndDiagonalLines =
    getHorizontalAndVerticalAndDiagonalLines(input);
  let coveredPoints = getAllCoveredPoints(
    horizontalAndVerticalAndDiagonalLines,
  );
  let crossPoints = getCrossPoints(coveredPoints);
  let numberOfOverlaps = getNumberOfOverlaps(crossPoints);
  return numberOfOverlaps;
};
