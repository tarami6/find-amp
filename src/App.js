import React, {Component, Fragment} from 'react';
import axios from 'axios'
import {Container, Grid} from "@material-ui/core";


import Header from './components/Header'
import Map from "./components/Map";
import Search from "./components/Search"


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Container maxWidth={"xl"} style={{ marginTop: '5vh'}}>
                    <Grid container justify={'center'} spacing={3} >
                        <Search/>
                        <Map/>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default App;
