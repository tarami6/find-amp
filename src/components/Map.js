import React, {Component} from 'react';
import L from 'leaflet'
import {Grid} from "@material-ui/core";


const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
    iconSize: [35, 46],
    iconAnchor: [17, 46]
});

class Map extends Component{



    componentDidMount(){
        this.map = L.map('map', {
            center: [32, 35],
            zoom: 8,
            zoomControl: false,
            zoomAnimationThreshold: 10
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map)
        this.fewMarkers()
    }

     fewMarkers = () => {
        L.marker([31.795554, 34.639519], {icon: customIcon}).addTo(this.map)
        L.marker([32.086067, 34.886827], {icon: customIcon}).addTo(this.map)
    }

    showLocation = () => {
        this.map.setView([32, 35], 14);
    }
    showLocation2 = () => {
        this.map.setView([32, 35], 8);
    }

    render() {
        return (
            <Grid item xs={8} sm={8} >
            <div style={{width: '100%', height: '80vh',border: "1px solid lightGrey",boxShadow: "#c6c4c4 1px 0px 10px 1px", borderRadius: "10px"}} id={'map'}/>
            </Grid>
        );
    }
};


export default Map;
