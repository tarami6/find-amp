import React from "react";
import { LocalAtm as LocalAtmIcon } from "@material-ui/icons/";
import { Typography, ListItemText, ListItem } from "@material-ui/core";

const RenderRow = props => {
  const { data, index, style } = props;
  const { atmsList, setpointLocation } = data;
  return (
    <div style={style} key={index}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ListItem
          button
          onClick={() => setpointLocation(atmsList[index])}
          className={"listItem"}
          style={{
            borderRadius: "10px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: " all 0.3s cubic-bezier(.25,.8,.25,1)",
            width: "98%",
            height: "90px"
          }}
        >
          <LocalAtmIcon color={"disabled"} />
          <ListItemText
            style={{ textAlign: "right", marginRight: 10 }}
            primary={`${atmsList[index].ATM_Address} - ${atmsList[index].City}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  style={{ display: "inline", paddingLeft: "5px" }}
                  color="textPrimary"
                >
                  {atmsList[index].Bank_Name}
                </Typography>
                {atmsList[index].ATM_Type}
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    </div>
  );
};

export default RenderRow;
