"use Client";
import {  DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
interface CalenderProps {
  value: Range;
  onChang: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}
const Calender: React.FC<CalenderProps> = ({
  value,
  onChang,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChang}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};
export default Calender;
