import React, { useState } from 'react';
import search from '../assets/search.png';
import wetherInfo from '../hooks/wetherinfo';

function Searchbar() {
  const [location, setLocation] = useState("india");

  const handleOnChange = (e) => {
setLocation( e.target.value)

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const weatherData = await wetherInfo(location)
console.log(weatherData)

    console.log(weatherData.loction.name);
    // return weatherData
  };

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input
        type="text"
        className='bg-blue-300 h-10 w-80 rounded-full pl-4 text-white outline-none shadow-xl placeholder-shown:border-white-500 transition duration-100 focus:shadow-sky-100 focus:shadow-md'
        placeholder='Search'
     onChange={handleOnChange}
       
      />
      <button
        type="submit"
        className='bg-blue-300 p-2 rounded-full shadow-md hover:shadow-sky-400 duration-100 smooth'
      >
        <img className='w-6 h-6' src={search} alt="" />
      </button>
    </form>
  );
}

export default Searchbar;
