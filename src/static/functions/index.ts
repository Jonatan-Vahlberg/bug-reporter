import moment from 'moment';
import {TeamPosition} from 'src/models/TeamMember';

export const breakoutISODate = (
  dateString: string,
  from: number = 0,
  to: number = 10,
) => {
  return dateString.substr(from, to);
};

export const formatDate = (dateString: string) => {
  const date: Date = new Date(dateString);
  const now: Date = new Date();

  if (date.getFullYear() === now.getFullYear()) {
    if (date.getMonth() === now.getMonth()) {
      if (date.getDate() === now.getDate()) {
        return `Today at ${moment(date).format('hh:mm A')}`;
      } else if (date.getDate() === now.getDate() + 1) {
        return `Tomorrow at ${moment(date).format('hh:mm A')}`;
      } else if (date.getDate() === now.getDate() - 1) {
        return `Yesterday at ${moment(date).format('hh:mm A')}`;
      }
    }
    return moment(date).format('MM DD hh:mm A');
  }
  return moment(date).format('YYYY MM DD hh:mm A');
};

export const getDateOfStartAndEndOfWeek = (): [Date, Date] => {
  const today = new Date();
  const day = today.getDay();
  const startDiff = today.getDate() - day + (day === 0 ? -6 : 1);
  const endDiff = startDiff + 6;
  const startDate = new Date(today.setDate(startDiff));
  const endDate = new Date(today.setDate(endDiff));
  return [startDate, endDate];
};

export const getRandomCode = (): string => {
  let numbersArray: number[] = [0, 0, 0, 0, 0, 0];
  let code: string = '';
  numbersArray = numbersArray.map(() => {
    const newNumber = Math.floor(Math.random() * 10);
    code = code + newNumber;
    return newNumber;
  });
  return code;
};

export const getWrittenPosition = (position: TeamPosition) => {
  switch (position) {
    case 'TECH_LEAD':
      return 'Tech Lead';
    case 'ADMIN':
    case 'DEVELOPER':
    case 'OTHER':
    case 'TESTER':
    default:
      return `${position.substr(0, 1).toUpperCase()}${position
        .substr(1)
        .toLowerCase()}`;
  }
};
