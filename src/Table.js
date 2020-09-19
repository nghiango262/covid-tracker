import React from "react";
import "./Table.css";

function Table({ data }) {
  const TableRow = ({ title, flag, cases }) => {
    return (
      <tr>
        <td>
          <img src={flag} alt="" />
          {title}
        </td>
        <td>
          <strong>{cases}</strong>
        </td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>Country</th>
          <th>Cases</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((country, index) => {
          return (
            <TableRow
              key={index}
              title={country.country}
              flag={country.countryInfo.flag}
              cases={country.cases}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
