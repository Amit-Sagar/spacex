import React, { useState, useEffect } from "react";
import axios from "axios";
import { generateSearchTerm, getParamsFromUrl } from "../../utils/index";
import CardList from "./components/CardList";
import TimelineFilter from "./components/TimelineFIlter";
import DateFilter from "./components/DateFilter";
import StatusFilter from "./components/StatusFilter";
import { useNavigate } from "react-router";
import "semantic-ui-css/semantic.min.css";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

let urlTimeline;
let urlStatus;

const Dashboard = () => {
  urlTimeline = window?.location?.pathname || "";
  const data = getParamsFromUrl(window?.location?.search);
  if (data !== undefined) {
    if (data.length === 3) {
      urlStatus = data[2];
    } else if (data.length === 1) {
      urlStatus = data[0];
    }
  }

  console.log(data,"urlStatus")

  const [launches, setlaunches] = useState([]);
  const [timeline, setTimeline] = useState(urlTimeline || "");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState(urlStatus);
  const [activePage, setActivePage] = useState(1);
  const [launchCount, setLaunchCount] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  console.log(params, "hello");
  const getLaunches = async (searchTerm) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.spacexdata.com/v3/launches${searchTerm}`
      );
      setLaunchCount(res.headers["spacex-api-count"]);
      setlaunches(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(params.get("launch_success"), "success");
    const term = generateSearchTerm(
      timeline,
      startDate,
      endDate,
      status,
      activePage,
      params,
      setParams
    );
    getLaunches(term);
    navigate(term);
  }, [timeline, startDate, endDate, status, activePage]);

  return (
    <>
      <div className="w-4/5 mx-auto flex flex-col">
        <div className="py-7 flex justify-between items-center">
          <TimelineFilter timeline={timeline} setTimeline={setTimeline} />
          <DateFilter
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <StatusFilter status={status} setStatus={setStatus} />
        </div>
        <CardList
          isLoading={isLoading}
          launches={launches}
          activePage={activePage}
          setActivePage={setActivePage}
          launchCount={launchCount}
        />
      </div>
    </>
  );
};

export default Dashboard;
