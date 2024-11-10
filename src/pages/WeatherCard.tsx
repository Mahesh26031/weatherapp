import { range } from 'lodash';
import { formatDateAndTime } from './utils';
import { useEffect, useState } from 'react';

const WeatherCard = ({ data }: { data: any }) => {
  const [filter, setFilter] = useState('5hour');

  const hourly = data.hourly();
  const utcOffsetSeconds = data.utcOffsetSeconds();

  const hourlyData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };

  const currentInterval = new Date();
  const nextHourlyIntervals = hourlyData.hourly.time
    .filter((time) => time >= currentInterval)
    .slice(0, 10)
    .map((time, index) => {
      const temperature =
        hourlyData.hourly.temperature2m[hourlyData.hourly.time.indexOf(time)];
      return { time: formatDateAndTime(time), temperature };
    });

  return (
    <div>
      <div className="WeatherForecast">
        <div className="WeatherForecast__buttons">
          <button
            className={`WeatherForecast__button ${
              filter === '5hour' ? 'active' : ''
            }`}
            onClick={() => setFilter('5hour')}
          >
            Next 5 hours
          </button>
          <button
            className={`WeatherForecast__button ${
              filter === '10hour' ? 'active' : ''
            }`}
            onClick={() => setFilter('10hour')}
          >
            Next 10 Hours
          </button>
        </div>
        <div className="WeatherForecast__list">
          {filter === '5hour' ? (
            <ul>
              {nextHourlyIntervals.slice(0, 5).map((item, index) => (
                <li key={index} className="WeatherForecast__listItem">
                  {item.time} {Math.round(item.temperature)}°C
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {nextHourlyIntervals.map((item, index) => (
                <li key={index} className="WeatherForecast__listItem">
                  {item.time} {Math.round(item.temperature)}°C
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

// latitude(): number
// longitude(): number;
// elevation(): number;
// generationTimeMilliseconds(): number;
// locationId(): bigint;
// model(): Model;
// utcOffsetSeconds(): number;
// timezone(): string | null;
// timezone(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
// timezoneAbbreviation(): string | null;
// timezoneAbbreviation(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
// current(obj?: VariablesWithTime): VariablesWithTime | null;
// daily(obj?: VariablesWithTime): VariablesWithTime | null;
// hourly(obj?: VariablesWithTime): VariablesWithTime | null;
// minutely15(obj?: VariablesWithTime): VariablesWithTime | null;
// sixHourly(obj?: VariablesWithTime): VariablesWithTime | null;
