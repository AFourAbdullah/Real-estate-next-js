import axios from "axios";

export const BASE_URL = "https://bayut.p.rapidapi.com";

//function for fetching data from api
export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-RapidAPI-Key": "e9b6b22e96mshf26887d6c7fb387p1f2f96jsn81797d391716",
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  return data;
};
