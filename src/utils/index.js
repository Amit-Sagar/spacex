import React from "react";
import moment from "moment";

const getStatusLabel = (launch_success) => {
  if (launch_success === null) {
    return (
      <button className="text-yellow-600 border-2 border-yellow-600 px-3 py-1 rounded-md">
        Upcoming
      </button>
    );
  } else if (launch_success) {
    return (
      <button className="text-green-600 border-2 border-green-600 px-3 py-2 rounded-md">
        Successful
      </button>
    );
  } else {
    return (
      <button className="text-red-600 border-2 border-red-600 px-3 py-2 rounded-md ">
        Failed
      </button>
    );
  }
};

const getFormattedDate = (utcDate) => {
  return moment(utcDate).utc().format("DD MMMM YYYY HH:mm");
};

const generateSearchTerm = (
  timeline,
  startDate,
  endDate,
  status,
  activePage
) => {
  let searchTerm = [];
  if (startDate) {
    startDate = moment(startDate).format("YYYY-MM-DD");
    searchTerm.push(`start=${startDate}`);
    if (!endDate) {
      searchTerm.push(`end=2030-01-01`);
    }
  }
  if (endDate) {
    endDate = moment(endDate).format("YYYY-MM-DD");
    searchTerm.push(`end=${endDate}`);
    if (!startDate) {
      searchTerm.push(`start=2002-05-06&`);
    }
  }
  if (activePage) {
    const limit = 10;
    searchTerm.push(`limit=${limit}`);
    searchTerm.push(`offset=${(activePage - 1) * limit}`);
  }
  if (status === "success") {
    searchTerm.push(`launch_success=true`);
  } else if (status == "fail") {
    searchTerm.push(`launch_success=false`);
  }
  searchTerm = searchTerm.join("&");
  if (timeline === "All") {
    return `${searchTerm}`;
  } else {
    return `${timeline}?${searchTerm}`;
  }
};

const getParamsFromUrl = (params) => {
  var urlStatus;
  var urlStartDate;
  var urlEndDate;
  let mainTerm = params.substring(1);
  let arr = mainTerm.split("&");
  if (arr.length === 5) {
    urlStartDate = arr[0].split("=")[1];
    urlEndDate = arr[1].split("=")[1];
    urlStatus = getUrlStatus(arr[4]);
    return [urlStartDate, urlEndDate, urlStatus];
  } else if (arr.length === 4) {
    urlStartDate = arr[0].split("=")[1];
    urlEndDate = arr[1].split("=")[1];
    return [urlStartDate, urlEndDate];
  } else if (arr.length === 3) {
    urlStatus = getUrlStatus(arr[2]);
    return [urlStatus];
  } else if (arr.length === 2) {
    return arr.join("&");
  }
};
const getUrlStatus = (statusString) => {
  var statusToBoolean;
  if (statusString.split("=")[1] === "false") {
    statusToBoolean = false;
  } else if (statusString.split("=")[1] === "true") {
    statusToBoolean = true;
  }
  return Boolean(statusToBoolean);
};

export {
  getStatusLabel,
  getFormattedDate,
  generateSearchTerm,
  getParamsFromUrl,
};
