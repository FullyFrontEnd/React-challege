import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, Range } from "react-date-range";
import styled from "styled-components";
import moment from "moment";

const MuiDateRange = styled(DateRange)`
  display: block;
  width: 279px;
  margin: 0 auto;
  .rdrMonth {
    width: 280px;
  }
  .rdrWeekDay {
    width: 37px;
    max-width: 37px;
    font-weight: bold;
    color: #000;
  }
  .rdrDay {
    height: 35px;
    width: 35px;
    border: 1px solid #ddd;
    border-radius: 10px;
    &.rdrDayPassive {
      background: #f0f3f8;
    }
    .rdrDayNumber {
      top: 0;
      bottom: 0;
    }
    &:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,
    &:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,
    &:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span,
    &:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span {
      color: #000000 !important;
      font-weight: 500;
    }
  }

  .rdrStartEdge,
  .rdrInRange,
  .rdrEndEdge,
  .rdrDayInPreview,
  .rdrDayStartPreview,
  .rdrDayEndPreview {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
  }
  .rdrMonthAndYearWrapper {
    position: relative;
    span.rdrMonthAndYearPickers {
      flex: none;
    }
    .rdrMonthPicker select,
    .rdrYearPicker select {
      font-weight: bold;
      font-size: large;
      padding-left: 0;
      text-align: left;
      background: none;
      padding-right: 0;
    }
    .rdrNextPrevButton {
      background: none;
      margin: 0;
      i {
        width: 6px;
        height: 6px;
        border: 2px solid #34495e;
        border-left: 0;
        border-top: 0;
      }
    }
    .rdrPprevButton {
      position: absolute;
      right: 25px;
      transform: rotate(135deg);
      margin-top: 3px;
    }
    .rdrNextButton {
      transform: rotate(-45deg);
      margin-right: 8px;
      margin-top: 2px;
    }
  }
`;
type RangePickerProps = {
  selectedRange: Range;
  onRangeSelect: (range: Range) => void;
};
export function RangePicker({
  selectedRange,
  onRangeSelect,
}: RangePickerProps): JSX.Element {
  const [range, setRange] = useState<Range[]>([selectedRange]);
  const onDateChange = (item: any) => {
    setRange([item.selection]);
    if (
      moment(item.selection.endDate).diff(
        moment(item.selection.startDate),
        "days"
      ) > 1
    ) {
      onRangeSelect(item.selection);
    }
  };
  return (
    <>
      <MuiDateRange
        onChange={onDateChange}
        ranges={range}
        showDateDisplay={false}
        rangeColors={["#6eeac9"]}
        weekdayDisplayFormat="EEEEEE"
        weekStartsOn={1}
      />
    </>
  );
}
