export const toFloat = (number: any): number =>
  isNaN(number) ? 0 : parseFloat(number);

export const toInt = (number: any): number =>
  isNaN(number) ? 0 : parseInt(number);

export const toDateString = (date: any): string =>
  !date || date == '0000-00-00' ? null : date;

export const toDate = (dateString: any): Date => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getTime() > 0 ? date : null;
  }
  return null;
};

export const nullIfEmptyString = (text: any): string =>
  !text || text.trim() === '' ? null : text.trim();

export const tinyIntToBoolean = (number: number) => number == 1;
