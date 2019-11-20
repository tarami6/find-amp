import React, {Fragment, useEffect, useState} from 'react';
import {Grid, TextField,InputAdornment, Typography} from "@material-ui/core";
import {Search as SearchIcon , LocalAtm as LocalAtmIcon} from '@material-ui/icons/';
import {FixedSizeList as List} from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import index from "../../index.css"
import {createMuiTheme, jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import {create} from 'jss';

import rtl from 'jss-rtl';
import axios from "axios";


const theme = createMuiTheme({
    direction: 'rtl',
});

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

function renderRow(props) {
    const { data, index, style } = props;
    return (
<div style={style} key={index}>
    <div style={{display: "flex", justifyContent: "center"}}>
        <ListItem button className={"listItem"} style={{ borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",transition:" all 0.3s cubic-bezier(.25,.8,.25,1)",  width: "98%", height: "90px"}} >
            <LocalAtmIcon color={"disabled"}/>
            <ListItemText style={{textAlign: "right", marginRight: 10}}
                          primary={`${data[index].ATM_Address} - ${data[index].City}`}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            style={{display:"inline", paddingLeft: "5px"}}
                            color="textPrimary"
                        >
                            {data[index].Bank_Name}
                        </Typography>
                        {data[index].ATM_Type}
                    </React.Fragment>
                }
            />
        </ListItem>
    </div>

</div>

    );
}

const Search = props => {
    const [address, setAddress] = useState("")
    const [atmsList, setAtmsList] = useState([])



    let search = (text) => axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26&q=תל`)
        .then(function (response) {
            // handle success
            console.log(response.data.result.records);
            setAtmsList(response.data.result.records);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    useEffect(() => {
        console.log("address", address)

            search(address)
    }, [address])

    return (
        <Grid item xs={4} sm={4}>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <div dir="rtl">
                        <TextField
                            id="outlined-search"
                            label="הזן כתובת"
                            type="search"
                            style={{width: "100%", direction: "rtl", marginTop: "5px"}}
                            value={address }
                            onChange={(e) => {
                                setAddress(e.target.value)

                            }}
                            InputProps={
                                {
                                    startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
                                }
                            }
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
                itemData={atmsList}
            >
                {renderRow}
            </List>

        </Grid>
    );
};


export default Search;
