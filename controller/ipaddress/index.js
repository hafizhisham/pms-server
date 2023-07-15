import axios from "axios";

// const axios = require("axios");

const ipaddress = async () => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/ip.json",
    params: { q: "<REQUIRED>" },
    headers: {
      "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default ipaddress;
