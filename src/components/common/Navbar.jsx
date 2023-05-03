import React from "react";

function Navbar() {
  return (
    <div className="bg-black h-30 w-full ">
      <div className="flex items-center w-full">
        <div className="w-[13%] object-fit  ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ilU8p3skjvwmSdcGIs9csghmO-JmA-5DkA&usqp=CAU"
            alt="spacex-logo"
          />
        </div>
        <h1 className="text-white text-4xl font-bold text-center">Dashboard</h1>
      </div>
    </div>
  );
}

export default Navbar;
