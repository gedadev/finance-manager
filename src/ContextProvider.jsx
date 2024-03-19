import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userOptions, setUserOptions] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [dateRange, setDateRange] = useState({
    initDate: Date.now() - 86400000 * 35,
    endDate: Date.now(),
  });

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
        toast.error("Error fetching your data", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    };
    getFilters();
  }, []);

  useEffect(() => {
    if (dateRange.initDate > dateRange.endDate) {
      [dateRange.initDate, dateRange.endDate] = [
        dateRange.endDate,
        dateRange.initDate,
      ];
      warnInvalidDate();
    }

    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-expenses?initDate=${dateRange.initDate}&endDate=${dateRange.endDate}`
        );
        const sortedData = response.data.sort((a, b) => b.date - a.date);
        const data = sortedData.map((obj) => ({
          ...obj,
          date: new Date(obj.date).toLocaleDateString(),
          price: `$${Number.parseFloat(obj.price).toFixed(2)}`,
        }));
        setExpenses(data);
      } catch (error) {
        toast.error("Error fetching your data", {
          autoClose: 3000,
        });
      }
    };
    getData();
  }, [dateRange]);

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

  const handleDates = (e) => {
    const { name, value } = e.target;

    if (value) {
      setDateRange({ ...dateRange, [name]: convertToTimestamp(value) });
    } else {
      setDateRange({
        initDate: Date.now() - 86400000 * 35,
        endDate: Date.now(),
      });
    }
  };

  const warnInvalidDate = () =>
    toast.warn("Invalid range, dates swapped", {
      position: "bottom-right",
      autoClose: 3000,
    });

  return (
    <UserContext.Provider
      value={{
        convertToDate,
        convertToTimestamp,
        userOptions,
        handleDates,
        dateRange,
        expenses,
      }}
    >
      {children}
      <ToastContainer />
    </UserContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

export default ContextProvider;
