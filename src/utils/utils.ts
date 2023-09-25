/* eslint-disable no-restricted-syntax */

interface UtilitiesInterface {
  filterAndCreateObject(array: any, filterKey: any, filterValue: any, firstStepObjectKey: any, secondStepObjectKey: any): any;
  getWeekNumber(date: Date): string;
  isDate(arg: any): boolean;
}

const Utilities: UtilitiesInterface = {
  filterAndCreateObject(array, filterKey, filterValue, firstStepObjectKey, secondStepObjectKey) {
    const result: { [key: string]: any } = {};

    for (const item of array) {
      if (item[filterKey] === filterValue) {
        let key = item[firstStepObjectKey];
        let value = item[secondStepObjectKey];

        if (Utilities.isDate(key)) key = Utilities.getWeekNumber(new Date(key));
        if (Utilities.isDate(value)) value = Utilities.getWeekNumber(new Date(value));

        if (!result[key]) result[key] = {};

        if (!result[key][value])
          result[key][value] = {
            reservationCount: 0,
            adultCount: 0,
            champagneCountToPrepare: 0,
          };

        if (item.adults === 0) result[key][value].reservationCount += 1;
        else {
          result[key][value].reservationCount += 1;
          result[key][value].champagneCountToPrepare += 1;
          result[key][value].adultCount += item.adults;
        }
      }
    }

    return result;
  },

  getWeekNumber(date: Date): string {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return `Week ${weekNumber}`;
  },

  isDate(arg: any): boolean {
    const response = typeof arg === 'string' && !Number.isNaN(Date.parse(arg));
    return response;
  },
};

export default Utilities;
