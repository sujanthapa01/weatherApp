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

    // return weatherData
  };

  return (
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
  );
}

export default Searchbar;
