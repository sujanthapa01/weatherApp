import React, { useState, useEffect, useRef } from "react";
import search from "./assets/search.png"; // Importing search icon
import wetherInfo from "./hooks/wetherinfo"; // Importing weather information hook
import backgroundImg from "./assets/background.jpg"; // Importing background image


function App() {
  const [location, setLocation] = useState("india");
  const [weatherData, setWeatherData] = useState(null);
  const [alert, setAlert] = useState("No matching location found.");
  const [alertVisible, setAlertVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Japan",
    "Bhutan",
    "Nepal",
    "Russia",
  ]);

  useEffect(() => {
    const fetchDefaultData = async () => {
      const data = await wetherInfo(location);
      setWeatherData(data);
    };
    fetchDefaultData();
  }, []);

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await wetherInfo(location);
    if (data.error) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        console.log(alert);
      }, 3000);
    } else {
      setWeatherData(data);
     
    }
    if (searchText.trim() !== "") {
      if(data.error){

      }else{
        const updatedSearches = [searchText, ...recentSearches.slice(0, 3)];
        setRecentSearches(updatedSearches);
        setSearchText("");
      }
    }
  };
  


  const scrollRef = useRef(null);

 const handleRecentSearch = async (searchText) => {
   const data = await wetherInfo(searchText);
   console.log(data)
   if (data.error) {
     setAlertVisible(true);
     setRecentSearches((prev => prev))
     setTimeout(() => {
       setAlertVisible(false);
      }, 3000);
     
    } else {
      setSearchText(searchText);
      setWeatherData(data);
    }

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="flex justify-center h-full xl:h-screen items-center text-center flex-col relative"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={`alert ${alertVisible ? "show" : ""}`}>{alert}</div>

      <div className="flex justify-start flex-col-reverse xl:flex-row items-center gap-10 pt-4 pb-4 xl:pt-4 xl:pb-4 xl:pl-10 xl:pr-10 bg-blur w-full xl:h-[30rem] xl:w-[52rem]  xl:rounded-3xl open-tan">
        <div className="sm:w-full w-full pl-6 pr-6 xl:w-[40%] h-[full] flex flex-col justify-between gap-4 xl:border-r-[1px] xl:pr-10">
          <div className="h-[50%] ">
            <h3 className="text-3xl tracking-[.2rem] xl:text-2xl border-b-[1px] text-center xl:text-start pb-4 xl:pb-2 font-bold text-white">
              Details
            </h3>
            {weatherData ? (
              <div className="info mt-8 xl:mt-4 flex pb-[2rem] xl:pb-[0rem] flex-col gap-5 xl:gap-2 open-tran">
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-xl xl:text-lg ">Country</span>{" "}
                    <span className="w-[8rem] text-end ">
                      {weatherData.location.country}{" "}
                    </span>
                  </div>
                )}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-xl xl:text-lg   ">Cloud</span>{" "}
                    <span className="">{weatherData.current.cloud} %</span>
                  </div>
                )}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-xl xl:text-lg   ">wind dir</span>{" "}
                    <span className="">{weatherData.current.wind_dir} </span>
                  </div>
                )}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-xl xl:text-lg ">Humidity</span>{" "}
                    <span className="">{weatherData.current.humidity} %</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[8.5rem] pt-4">
                <div className="flex loader"></div>
              </div>
            )}
          </div>
          <div className="h-[50%] ">
            <h3 className=" text-3xl tracking-[.2rem] xl:text-2xl border-b-[1px] text-center xl:text-start pb-4 xl:pb-2 font-bold text-white">
            Recent 
            </h3>
            <div className="flex items-center xl:items-start flex-col gap-5 xl:gap-3 mt-8 xl:mt-4 open-tran">
              {recentSearches.map((search, index) => (
                <span
                  id="options"
                  className="text-2xl xl:text-lg cursor-pointer flex justify-center gap-1 w-full items-center"
                  key={index}
                  onClick={() => handleRecentSearch(search, scrollRef)}
                  
                >
                  {search}
                  {/* arrow  */}
                  <svg
                    id="arrow-horizontal"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="10"
                    viewBox="0 0 46 16"
                  >
                    <path
                      id="Path_10"
                      data-name="Path 10"
                      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                      transform="translate(30)"
                      fill="#fff"
                    ></path>
                  </svg>
                </span>
              ))}
            </div>
          </div>
          <span className="mt-12 text-[12px] text-neutral-500  text-center xl:hidden">
            developed by Sujan Thapa
          </span>
        </div>

        <div className="w-[60%] h-full flex flex-col justify-start " ref={scrollRef}>
          <div className="flex justify-between items-center gap-5 xl:gap-[0px] flex-col xl:flex-row  mt-4 w-full">
            <h3 className="text-xl"  >Forecast</h3>
            <form className="flex items-center gap-2" onSubmit={handleSubmit}>
              <input
                type="text"
                className="bg-white h-10 w-64 xl:w-40 rounded-full text-black pl-4  outline-none shadow-xl"
                placeholder="Search"
                value={searchText}
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

          <div className="temprature text-center w-full h-[16rem]">
            {weatherData ? (
              <span className=" text-[8rem] xl:text-[11rem]  leading-[16rem] open-tran" 
             >
                {weatherData.current.temp_c}&deg;
              </span>
            ) : (
              <span className="flex justify-center items-center h-[18rem]">
                Temperature
              </span>
            )}
          </div>
          <div className="border-t-[1px] flex flex-col justify-center items-center  ">
            <div className="flex mt-2 gap-10 items-center justify-between">
              {weatherData ? (
                <div className="wrapper-1 xl:text-start flex flex-col justify-center xl:items-start open-tran">
                  <span className="text-3xl mt-4  xl:w-rem">
                  {weatherData ? (weatherData.location.region || weatherData.location.name) : null}
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
            <span className="mt-6 text-neutral-500 text-[12px] hidden  absolute bottom-[0.2rem] xl:flex">
              developed by Sujan Thapa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
