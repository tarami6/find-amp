import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons/";
import { FixedSizeList as List } from "react-window";
import {
  createMuiTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider
} from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import axios from "axios";

import RenderRow from "./RenderRow";

const theme = createMuiTheme({
  direction: "rtl"
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Search = props => {
  const { setpointLocation, setAllMarkers } = props;
  const [address, setAddress] = useState("");
  const [atmsList, setAtmsList] = useState([]);

  let search = text =>
    axios
      .get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&q=${text}`
      )
      .then(function(response) {
        // handle success
        console.log(response.data.result.records);
        setAtmsList(response.data.result.records);
        setAllMarkers(response.data.result.records);
        setpointLocation();
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

  useEffect(() => {
    console.log("address", address);
    if (address.length > 1) search(address);
    else {
      setAtmsList([]);
      setAllMarkers([]);
    }
  }, [address]);

  let pointLoction = point => {
    console.log("point", point);
  };

  return (
    <Grid item sm={12} xs={12} md={4} lg={4}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <TextField
              id="outlined-search"
              label="הזן כתובת"
              type="search"
              style={{ width: "100%", direction: "rtl", marginTop: "5px" }}
              value={address}
              onChange={e => {
                setAddress(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
        </ThemeProvider>
      </StylesProvider>
      <List
        direction={"rtl"}
        useIsScrolling
        columnWidth={500}
        height={570}
        className={"list"}
        itemSize={100}
        itemCount={atmsList.length}
        itemData={{
          atmsList,
          setpointLocation
        }}
      >
        {RenderRow}
      </List>
    </Grid>
  );
};

export default Search;
