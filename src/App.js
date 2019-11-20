import React, { Component, Fragment } from "react";
import { Container, Grid } from "@material-ui/core";

//Components
import Header from "./components/Header";
import Map from "./components/Map";
import Search from "./components/Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMarkers: [],
      pointLocation: {
        long: 32,
        lat: 35
      }
    };
  }

  setAllMarkers = arr => {
    this.setState({ allMarkers: arr });
  };

  setpointLocation = point => {
    const { X_Coordinate, Y_Coordinate } = point;
    this.setState({
      pointLocation: {
        long: X_Coordinate ? X_Coordinate : 32,
        lat: Y_Coordinate ? Y_Coordinate : 35
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <Container maxWidth={"xl"} style={{ marginTop: "5vh" }}>
          <Grid container justify={"center"} spacing={3}>
            <Search
              setpointLocation={this.setpointLocation}
              setAllMarkers={this.setAllMarkers}
            />
            <Map
              center={this.state.pointLocation}
              markers={this.state.allMarkers}
            />
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default App;
