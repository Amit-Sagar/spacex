import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateFilter({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="flex gap-5 items-center">
      <div className="">
        <p className="filter-name-label ">Start Date</p>
        <DatePicker
          selected={startDate}
          selectsStart
          isClearable
          dateFormat="yyyy/MM/dd"
          showYearDropdown
          showMonthDropdown
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="px-2 py-1 border-2 border-black rounded-md"
        />
      </div>
      <div className="">
        <p className="filter-name-label">End Date</p>
        <DatePicker
          selected={endDate}
          selectsStart
          isClearable
          dateFormat="yyyy/MM/dd"
          showYearDropdown
          showMonthDropdown
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="px-2 py-1 border-2 border-black rounded-md"
        />
      </div>
    </div>
  );
}

export default DateFilter;
