export const toMysqlDate = (date: Date): string => {
  let dateString = 'NULL';
  if (date) {
    dateString = new Date(
      new Date(date.toISOString()).getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
  }
  return dateString;
};
