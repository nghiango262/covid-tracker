import { Card, CardContent } from "@material-ui/core";
import React, { useEffect } from "react";
import "./App.css";
import LineGraph from "./LineGraph";
import Table from "./Table";
import Header from "./Header";
import InfoBox from "./InfoBox";
import MapSection from "./Map";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ countryInfo, tableData }, dispatch] = useStateValue();

  //
  useEffect(() => {
    //
    const getAllCountriesInfo = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: actionTypes.SET_COUNTRY,
            country: "worldwide",
            countryInfo: data,
          });
        })
        .catch((error) => console.error(error));
    };
    getAllCountriesInfo();
  }, [dispatch]);

  return (
    <div className="app">
      <div className="app__left">
        {/* Header:: Chứa tên app và dropdown list countries  */}
        <Header />

        {/* Chưa 3 view info tổng ca mắc/ ca hồi phục/ ca chết (theo country chọn tên dropdown ) */}
        <div className="app__stats">
          {/* InfoBoxs */}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          {/* InfoBoxs */}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          {/* InfoBoxs */}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        
        <MapSection />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Bảng cập nhật số ca mắc (line)</h3>
          <div className="table-container">
            <Table data={tableData} />
          </div>

          {/* Graph */}
          <h3>Biểu đồ số ca nhiễm mới </h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
