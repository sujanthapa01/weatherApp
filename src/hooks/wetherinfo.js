

const apikey = "7ec2c6078d1a4244896175219240702";

const wetherInfo = async (location) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`API fetching error: ${error}`);
        return null;
    }
};

export default wetherInfo;