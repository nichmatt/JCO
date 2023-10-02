import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      try {
        setLoading(false);

        const response = await fetch(url);

        // console.log(response, "<<<ini response doang");

        const responseJson = await response.json();

        // console.log(responseJson, "<<<ini response json");

        setData(responseJson);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetch;
