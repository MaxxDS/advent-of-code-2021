export const formatInput = input => {
  input = input.split(',').map(x => parseInt(x));
  return input;
};

const getNumberOfLanternFishAfterXDays = (input, x) => {
  let result = [...input];
  for (let i = 0; i < x; i++) {
    let length = result.length;
    for (let j = 0; j < length; j++) {
      if (result[j] >= 1 && result[j] <= 8) {
        result[j] = result[j] - 1;
        // console.log(result);
      } else if (result[j] === 0) {
        result[j] = 6;
        result.push(8);
        // console.log(result);
      } else {
        console.log('error');
      }
      //   console.log(result);
    }
    console.log(result);
  }
  return result.length;
};

export const partOne = input => {
  return getNumberOfLanternFishAfterXDays(input, 3);
};

const getNumberOfFishWithXDaysToLive = input => {
  // formule magique trouvée sur https://jsbin.com/mebiwa/1/edit?js,console
  let map = input.reduce(function (obj, b) {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});

  return map;

  //   let obj = map;
  //   // https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
  //   let result = Object.entries(obj);
  //   return result;
};

const getNumberOfFishAfterYDaysFromNumberOfFishWithXDaysToLiveObject = (
  numberOfFishWithXDaysToLive,
  y,
) => {
  if (typeof numberOfFishWithXDaysToLive['0'] === 'undefined') {
    numberOfFishWithXDaysToLive['0'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['1'] === 'undefined') {
    numberOfFishWithXDaysToLive['1'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['2'] === 'undefined') {
    numberOfFishWithXDaysToLive['2'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['3'] === 'undefined') {
    numberOfFishWithXDaysToLive['3'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['4'] === 'undefined') {
    numberOfFishWithXDaysToLive['4'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['5'] === 'undefined') {
    numberOfFishWithXDaysToLive['5'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['6'] === 'undefined') {
    numberOfFishWithXDaysToLive['6'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['7'] === 'undefined') {
    numberOfFishWithXDaysToLive['7'] = 0;
  }
  if (typeof numberOfFishWithXDaysToLive['8'] === 'undefined') {
    numberOfFishWithXDaysToLive['8'] = 0;
  }

  //   let array = [
  //     0, 0, 0, 0, 0, 0, 0, 0, 0,
  //   ];
  let numberOfFishWithXDaysToLiveAsArray = Object.values(
    numberOfFishWithXDaysToLive,
  );

  console.log('numberOfFishWithXDaysToLiveAsArray:');
  console.log(numberOfFishWithXDaysToLiveAsArray);

  //   console.log('numberOfFishWithXDaysToLiveOnTheNextDay:');
  //   console.log(numberOfFishWithXDaysToLiveOnTheNextDay);

  let numberOfFishWithXDaysToLiveOnTheNextDayASArray = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  //   let numberOfFishWithXDaysToLiveAsArray = numberOfFishWithXDaysToLive.values();
  //   console.log('numberOfFishWithXDaysToLiveAsArray:');
  //   console.log(numberOfFishWithXDaysToLiveAsArray);
  //   console.log('numberOfFishWithXDaysToLiveOnTheNextDayASArray:');
  //   console.log(numberOfFishWithXDaysToLiveOnTheNextDayASArray);

  for (let i = 0; i < y; i++) {
    // console.log('i:');
    // console.log(i);
    for (let j = 0; j < 9; j++) {
      //   console.log('j:');
      //   console.log(j);

      if (j === 6) {
        numberOfFishWithXDaysToLiveOnTheNextDayASArray[j] =
          numberOfFishWithXDaysToLiveAsArray[j + 1] +
          numberOfFishWithXDaysToLiveAsArray[0];
      } else if (j >= 0 && j <= 7) {
        // console.log('j2:');
        // console.log(j);

        // console.log('numberOfFishWithXDaysToLiveOnTheNextDayASArray[j]:');
        // console.log(numberOfFishWithXDaysToLiveOnTheNextDayASArray[j]);

        numberOfFishWithXDaysToLiveOnTheNextDayASArray[j] =
          numberOfFishWithXDaysToLiveAsArray[j + 1];
        // numberOfFishWithXDaysToLive["${j+1}"];

        // console.log('numberOfFishWithXDaysToLiveOnTheNextDayASArray[j]:');
        // console.log(numberOfFishWithXDaysToLiveOnTheNextDayASArray[j]);
      } else if (j === 8) {
        numberOfFishWithXDaysToLiveOnTheNextDayASArray[j] =
          numberOfFishWithXDaysToLiveAsArray[0];
      }
    }
    numberOfFishWithXDaysToLiveAsArray = [
      ...numberOfFishWithXDaysToLiveOnTheNextDayASArray,
    ];
    console.log('i+1:');
    console.log(i + 1);
    console.log('numberOfFishWithXDaysToLiveAsArray:');
    console.log(numberOfFishWithXDaysToLiveAsArray);
  }

  let sum = 0;
  for (let i = 0; i < numberOfFishWithXDaysToLiveAsArray.length; i++) {
    sum = sum + numberOfFishWithXDaysToLiveAsArray[i];
  }
  return sum;
};

export const partTwo = input => {
  return getNumberOfFishAfterYDaysFromNumberOfFishWithXDaysToLiveObject(
    getNumberOfFishWithXDaysToLive(input),
    256,
  );
};
