import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({ title, cases, total }) {
  return (
    // <div className="infoBox">

    // </div>
    <Card>
      <CardContent>
        <Typography className="infoBox__title">{title}</Typography>
        <h2 className="infoBox__cases">{cases}</h2>
        <Typography>{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
