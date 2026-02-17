import dayjs from 'dayjs';
import dayjsDurationPlugin from 'dayjs/plugin/duration';

const DateFormat = {
  TIME: 'HH:mm',
  MONTH_DAY: 'MMM D',
};

const DurationFormat = {
  MINUTES: 'm[M]',
  HOURS_MINUTES: 'HH[H] mm[M]',
};

dayjs.extend(dayjsDurationPlugin);

function formatTime(date) {
  return dayjs(date).format(DateFormat.TIME);
}

function formatDay(date) {
  return dayjs(date).format(DateFormat.MONTH_DAY);
}

function calcDuration(startDate, endDate) {
  return dayjs(endDate).diff(dayjs(startDate));
}

function formatDuration(milliseconds) {
  const duration = dayjs.duration(milliseconds);

  const daysCount = Math.floor(duration.asDays());
  const hoursCount = duration.hours();

  if (daysCount) {
    return `${String(daysCount).padStart(2, '0')}D ${duration.format(DurationFormat.HOURS_MINUTES)}`;
  }

  if (hoursCount) {
    return duration.format(DurationFormat.HOURS_MINUTES);
  }

  return duration.format(DurationFormat.MINUTES);
}

function getFormattedDuration(startDate, endDate) {
  return formatDuration(calcDuration(startDate, endDate));
}

export { formatTime, formatDay, getFormattedDuration };
