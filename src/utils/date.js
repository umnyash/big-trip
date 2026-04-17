import dayjs from 'dayjs';
import dayjsDurationPlugin from 'dayjs/plugin/duration';

const TimeUnit = {
  MONTH: 'month',
};

const DateFormat = {
  TIME: 'HH:mm',
  DAY: 'D',
  DAY_MONTH: 'D MMM',
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

function formatDateRange(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const isSameMonth = start.isSame(end, TimeUnit.MONTH);

  return [
    start.format(isSameMonth ? DateFormat.DAY : DateFormat.DAY_MONTH),
    end.format(DateFormat.DAY_MONTH),
  ];
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

export { calcDuration, formatTime, formatDay, formatDateRange, getFormattedDuration };
