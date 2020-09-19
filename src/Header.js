import React, { useEffect } from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import Select from "react-select";
import { sortData } from "./utils";

function Header() {
  const [{ countries }, dispatch] = useStateValue();

  useEffect(() => {
    //get countries data
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countriesList = data.map((country) => ({
            label: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          dispatch({
            type: actionTypes.LIST_COUNTRIES,
            countries: countriesList,
            tableData: sortedData,
          });
        });
    };

    getCountriesData();
  }, [dispatch]);

  // Chọn nước để xem
  const onCountryChange = async (event) => {
    const countryCode = event.value;
    console.log("Iso", countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        dispatch({
          type: actionTypes.SET_COUNTRY,
          country: countryCode,
          countryInfo: data,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="header">
      {/* Title header */}
      <h1>Covid-19 Tracker </h1>

      {/* dropdown chọn nước để khảo sát */}
      <div className="header__dropdown">
        {/* <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
          ))}
        </Select> */}
        <Select
          onChange={onCountryChange} 
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 }),
            option: (provided, state) => ({
              ...provided,
              borderBottom: '2px green',
              color: state.isSelected ? 'yellow' : 'black',
              backgroundColor: state.isSelected ? 'green' : 'white'
            }),
            
            
          }}
          width="350px"
          defaultValue={{ label: 'Worldwide', value: 'worldwide'}}
          options={countries}
        />
      </div>
    </div>
  );
}

export default Header;
