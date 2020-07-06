import _ from 'lodash';

const utils = {
  random: (minInc: number, maxExc: number): number => {
    return minInc + Math.floor(Math.random() * (maxExc - minInc));
  },

  range: (minInc: number, maxExc: number): number[] => {
    return _.range(minInc, maxExc, 1);
  },

  sum: (numbers: number[]): number => _.sum(numbers),

  randomSumIn: (arr: number[], max: number): number[] => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default utils;
