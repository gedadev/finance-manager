import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userOptions, setUserOptions] = useState({});

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-filters");
        const data = {
          ...response.data,
          payMethod: response.data.payMethod.map((item) => item.name),
        };
        setUserOptions(data);
      } catch (error) {
        console.log(`Connection error, ${error}`);
      }
    };
    getFilters();
  }, []);

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  };

  const convertToTimestamp = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getTime();
  };

  return (
    <UserContext.Provider
      value={{ convertToDate, convertToTimestamp, userOptions }}
    >
      {children}
    </UserContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
