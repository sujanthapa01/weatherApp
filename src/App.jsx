import { Searchbar } from "./components";
import sun from "./assets/sun.png";
import { useState } from "react";
import search from './assets/search.png';
import wetherInfo from './hooks/wetherinfo';
function App({ weatherdata }) {
  const background = {
    background: `url('https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const [location, setLocation] = useState("india");

  const handleOnChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const weatherData = await wetherInfo(location);
    console.log(weatherData);

    console.log(weatherData.location.name);
    // return weatherData
  };
  return (
    <div
      className="flex justify-center h-screen items-center"
      style={background}
    >
      <div className="flex justify-start flex-col items-center gap-12  pt-4 pb-4 pl-10 pr-10 bg-neutral-200 h-[28rem] w-[42rem] rounded-xl">
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="bg-blue-300 h-10 w-80 rounded-full pl-4 text-white outline-none shadow-xl placeholder-shown:border-white-500 transition duration-100 focus:shadow-sky-100 focus:shadow-md"
            placeholder="Search"
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="bg-blue-300 p-2 rounded-full shadow-md hover:shadow-sky-400 duration-100 smooth"
          >
            <img className="w-6 h-6" src={search} alt="" />
          </button>
        </form>
        <div className="flex justify-between w-full ">
          <div className="flex flex-col">
            {/* <span className="text-[2.4rem] leading-none" > {weatherdata.location.name}</span> */}
            <span>April 25,2004</span>
            <div>
              <img src={sun} alt="" srcset="" className="h-24 w-24" />
            </div>
          </div>
          <div className="">
            <span className="temprature text-[12rem] leading-[8rem] ">
              71&deg;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
