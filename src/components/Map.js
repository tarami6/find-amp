import React, {Component} from "react";
import L from "leaflet";
import {Grid} from "@material-ui/core";

const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [35, 46],
    iconAnchor: [17, 46]
});

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                long: this.props.center.long,
                lat: this.props.center.lat
            }
        };

        this.fewMarkers = this.fewMarkers.bind(this);
    }

    componentDidMount() {
        this.map = L.map("map", {
            center: [this.state.center.long, this.state.center.lat],
            zoom: 8,
            zoomControl: false,
            zoomAnimationThreshold: 10
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.center.long !== prevProps.center.long ||
            this.props.center.lat !== prevProps.center.lat
        ) {
            this.map.setView([ this.props.center.lat,  this.props.center.long], 20);
        }
        if (prevProps.markes !== this.props.markers) {
            this.fewMarkers( this.props.markers);
        }
    }

    fewMarkers(markers) {
        markers.forEach(mark => {
            L.marker([mark.Y_Coordinate, mark.X_Coordinate], {
                icon: customIcon
            }).addTo(this.map);
        });
    }

    render() {
        return (
            <Grid item sm={12} xs={12} md={8} lg={8}>
                <div
                    style={{
                        width: "100%",
                        height: "80vh",
                        border: "1px solid lightGrey",
                        boxShadow: "#c6c4c4 1px 0px 10px 1px",
                        borderRadius: "10px"
                    }}
                    id={"map"}
                />
            </Grid>
        );
    }
}

export default Map;
