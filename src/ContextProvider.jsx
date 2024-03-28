import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userOptions, setUserOptions] = useState({});
  const [expenses, setExpenses] = useState([]);
  const [dateRange, setDateRange] = useState({
    // initDate: Date.now() - 86400000 * 35, -> date initialized 35 days before today
    initDate: 1709251200000, // -> date initialized on march 1st 2024 for example purposes
    endDate: Date.now(),
  });
  const [updateView, setUpdateView] = useState(false);

  useEffect(() => {
    const getFilters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-filters");
        setUserOptions(response.data);
      } catch (error) {
        errorMessage("Error fetching data");
      }
    };
    getFilters();
  }, [updateView]);

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
        errorMessage("Error fetching data");
      }
    };
    getData();
  }, [dateRange, updateView]);

  const submitData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/add-entry",
        data
      );
      successMessage(response.data);
      performUpdate();
    } catch (error) {
      errorMessage("Error adding entry");
    }
  };

  const updateData = async (data, id) => {
    try {
      const response = await axios.post("http://localhost:3000/update-entry", {
        data,
        id,
      });
      successMessage(response.data);
      performUpdate();
    } catch (error) {
      errorMessage("Error updating");
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await axios.post("http://localhost:3000/delete-entry", {
        id,
      });
      successMessage(response.data);
      performUpdate();
    } catch (error) {
      errorMessage("Error deleting");
    }
  };

  const addUserOption = async (key, value) => {
    const array = [...userOptions[key], value];
    const body = { key, array };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-exp-prop",
        body
      );
      successMessage(response.data);
      performUpdate();
    } catch (error) {
      errorMessage("Error adding option");
    }
  };

  const performUpdate = () => setUpdateView(!updateView);

  const errorMessage = (message) =>
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
    });

  const successMessage = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
    });

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
        performUpdate,
        submitData,
        addUserOption,
        updateData,
        deleteData,
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
