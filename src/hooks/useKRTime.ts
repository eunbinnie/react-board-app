import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/**
 * 한국 시간 형식으로 변환
 * @returns 한국 시간 형식으로 변환된 시간
 */
const useKRTime = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return {
    format: (date?: string) =>
      dayjs(date).tz('Asia/Seoul').format('YYYY-MM-DD'),
  };
};

export default useKRTime;
