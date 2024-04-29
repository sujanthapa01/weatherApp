import { useState, useEffect } from "react";
import { Searchbar } from "./components";
import sun from "./assets/sun.png";
import search from "./assets/search.png";
import wetherInfo from "./hooks/wetherinfo";
import backgroundImg from "./assets/background.jpg";

function App() {
  const background = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const [location, setLocation] = useState("india");
  const [weatherData, setWeatherData] = useState(null);
  const [name, setName] = useState("New Delhi");

  useEffect(() => {
    const fetchDefaultData = async () => {
      const data = await wetherInfo(location);
      setWeatherData(data);
      console.log(data);
    };
    fetchDefaultData();
  }, []);

  const handleOnChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await wetherInfo(location);
    setWeatherData(data);
    console.log(data);
  };

  return (
    <div
      className="flex justify-center h-screen items-center"
      style={background}
    >
      <div className="flex justify-start  items-center gap-12  pt-4 pb-4 pl-10 pr-10 bg-blur  h-[28rem] w-[42rem] rounded-3xl">
        <div className="w-[30%] h-[full] flex flex-col justify-between gap-4">
          <div className="h-[50%]">
            <h3 className="text-2xl border-b-2 font-bold text-white">
              Details
            </h3>
            {"fething data" && (
              <div className="info mt-4 flex flex-col gap-2">
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">Country</span>{" "}
                    <span className="">{weatherData.location.country} </span>
                  </div>
                )}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">Cloud</span>{" "}
                    <span className="">{weatherData.current.cloud} %</span>
                  </div>
                )}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">wind dir</span>{" "}
                    <span className="">{weatherData.current.wind_dir} </span>
                  </div>
                )}
                {weatherData && (
                  <div className="flex justify-between">
                    <span className="text-lg ">Humidity</span>{" "}
                    <span className="">{weatherData.current.humidity} %</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="h-[50%] ">
            <h3 className="text-2xl border-b-2 font-bold text-white">
              Locations
            </h3>

            <div className="flex flex-col gap-3 items-start mt-4">
              <button className="text-lg ">Los Angeles</button>
              <button className="text-lg ">London</button>
              <button className="text-lg ">Dubai</button>
              <button className="text-lg ">Nepal</button>
            </div>
          </div>
        </div>

        <div className="w-[70%]">
          <div className="flex justify-between">
            <h3 className="text-xl">Forecast</h3>
            <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input
        type="text"
        className='bg-white h-10 w-40 rounded-full text-black pl-4  outline-none shadow-xl'
        placeholder='Search'
     onChange={handleOnChange}
       
      />
      <button
        type="submit"
        className='bg-white p-2 rounded-full shadow-md  smooth'
      >
        <img className='w-6 h-6' src={search} alt="" />
      </button>
    </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
