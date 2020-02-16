export const breakoutISODate = (
  dateString: string,
  from: number = 0,
  to: number = 10,
) => {
  return dateString.substr(from, to);
};
