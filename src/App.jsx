import React, { useState, useEffect } from "react";
import search from "./assets/search.png"; // Importing search icon
import wetherInfo from "./hooks/wetherinfo"; // Importing weather information hook
import backgroundImg from "./assets/background.jpg"; // Importing background image

function App() {
  // Styling for background image
  const background = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  // State for location
  const [location, setLocation] = useState("india");
  // State for weather data
  const [weatherData, setWeatherData] = useState(null);
  // State for location name
  const [alert, setAlert] = useState("can't find location");
  const [alertVisible, setAlertVisible] = useState(false);

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchDefaultData = async () => {
      const data = await wetherInfo(location);
      setWeatherData(data);
      // console.log(data);
    };
    fetchDefaultData();
  }, []);

  // Handle input change for location
  const handleOnChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle form submission to fetch weather data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await wetherInfo(location);
    if (data.error) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } else {
      setWeatherData(data);
    }
  };

  // console.log(alert);

  return (
    // Main container with background image
    <div
      className="flex justify-center h-full xl:h-screen items-center text-center  flex-col relative "
      style={background}
    >
            {/* Analytics component */}
           

      <div className={`alert ${alertVisible ? "show" : ""}`}>
  {alert}
      </div>

      {/* Weather information container */}
      <div className="flex justify-start flex-col-reverse xl:flex-row items-center gap-10  pt-4 pb-4 xl:pt-4 xl:pb-4 xl:pl-10 xl:pr-10 bg-blur w-full  xl:h-[30rem] xl:w-[52rem]  xl:rounded-3xl open-tan">
        {/* Details section */}
        <div className="sm:w-full w-full pl-6 pr-6 xl:w-[40%] h-[full] flex flex-col justify-between gap-4 xl:border-r-[1px] xl:pr-10">
          {/* Details header */}
          <div className="h-[50%] ">
            <h3 className="text-3xl tracking-[.2rem] xl:text-2xl border-b-[1px] text-center xl:text-start pb-4 xl:pb-2 font-bold text-white">
              Details
            </h3>
            {/* Weather information */}
            {weatherData ? (
              <div className="info mt-8 xl:mt-4 flex pb-[2rem] xl:pb-[0rem] flex-col gap-5 xl:gap-2 open-tran">
                {/* Country */}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">Country</span>{" "}
                    <span className="w-[8rem] text-end">
                      {weatherData.location.country}{" "}
                    </span>
                  </div>
                )}
                {/* Cloud */}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">Cloud</span>{" "}
                    <span className="">{weatherData.current.cloud} %</span>
                  </div>
                )}
                {/* Wind direction */}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">wind dir</span>{" "}
                    <span className="">{weatherData.current.wind_dir} </span>
                  </div>
                )}
                {/* Humidity */}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">Humidity</span>{" "}
                    <span className="">{weatherData.current.humidity} %</span>
                  </div>
                )}
              </div>
            ) : (
              // Loader when weather data is loading
              <div className="flex justify-center items-center h-[8.5rem] pt-4">
                <div className="flex loader"></div>
              </div>
            )}
          </div>
          {/* Locations section */}
          <div className="h-[50%] ">
            <h3 className=" text-3xl tracking-[.2rem] xl:text-2xl border-b-[1px] text-center xl:text-start pb-4 xl:pb-2 font-bold text-white">
              Locations
            </h3>

            {/* List of locations */}
            <div className="flex items-center xl:items-start flex-col gap-5 xl:gap-3 mt-8 xl:mt-4 open-tran">
              <button className="text-2xl xl:text-lg ">Los Angeles</button>
              <button className="text-2xl xl:text-lg ">London</button>
              <button className="text-2xl xl:text-lg ">Dubai</button>
              <button className="text-2xl xl:text-lg ">Nepal</button>
            </div>
          </div>
          <span className="mt-12 text-[12px] text-neutral-500  text-center xl:hidden">developed by Sujan Thapa</span>
        </div>

        {/* Forecast section */}
        <div className="w-[60%] h-full flex flex-col justify-start ">
          {/* Searchbar and forecast header */}
          <div className="flex justify-between items-center gap-5 xl:gap-[0px] flex-col xl:flex-row  mt-4 w-full">
            <h3 className="text-xl">Forecast</h3>
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                className="bg-white h-10 w-64 xl:w-40 rounded-full text-black pl-4  outline-none shadow-xl"
                placeholder="Search"
                onChange={handleOnChange}
              />
              <button
                type="submit"
                className="bg-white p-2 rounded-full shadow-md  smooth"
              >
                <img className="w-6 h-6" src={search} alt="" />
              </button>
            </form>
          </div>

          {/* Temperature display */}
          <div className="temprature text-center w-full h-[16rem]">
            {weatherData ? (
              <span className=" text-[8rem] xl:text-[11rem]  leading-[16rem] open-tran">
                {weatherData.current.temp_c}&deg;
              </span>
            ) : (
              <span className="flex justify-center items-center h-[18rem]">
                Temperature
              </span>
            )}
          </div>
          {/* Weather information */}
          <div className="border-t-[1px] flex flex-col justify-center items-center  ">
            <div className="flex mt-2 gap-10 items-center justify-between">
              {weatherData ? (
                <div className="wrapper-1 xl:text-start flex flex-col justify-center xl:items-start open-tran">
                  <span className="text-3xl mt-4  xl:w-rem">
                    {weatherData && weatherData.location.region}
                  </span>
                  <span className="mt-2 ">
                    {weatherData && weatherData.location.localtime}
                  </span>
                </div>
              ) : (
                <div className="loader mt-6 mb-7"></div>
              )}

              <div className="wrapper-2 open-tran">
                {weatherData ? (
                  <div className="weather-icon  flex flex-col justify-center items-center">
                    {weatherData && (
                      <img
                        className="h-18  "
                        src={weatherData.current.condition.icon}
                      />
                    )}
                    {weatherData && weatherData.current.condition.text}
                  </div>
                ) : (
                  <div className="loader mt-6 mb-7"> </div>
                )}
              </div>
            </div>
            <span className="mt-6 text-neutral-500 text-[12px] hidden  absolute bottom-[0.2rem] xl:flex">developed by Sujan Thapa</span>
          </div>
          
        </div>
      </div>
     
    </div>
  );
}

export default App;
