import axios from "axios";

// const axios = require("axios");

const ipaddress = async () => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/timezone.json',
        params: {q: 'q=Malaysia'},
        headers: {
          'X-RapidAPI-Key': '4d04074351mshc4f60fdd497cfa0p1f2276jsn7d8d0a60cec7',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
};

export default ipaddress;
