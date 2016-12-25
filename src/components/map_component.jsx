import React from "react";

export default class MapComponent extends React.Component {
    componentDidMount() {
        console.log("Map has successfully been mounted.");
        this.loadGoogleMapAPI();
    }

    loadGoogleMapAPI() {
        /* Programmatically add a script tag in order to load the Google Map JS API */
        const googleMapScriptTag = document.createElement("script");
        const API_KEY = "AIzaSyDt7-RR1AbYQbYPGHjdSV5WFK-bniFbezw";
        googleMapScriptTag.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&libraries=places`);
        googleMapScriptTag.setAttribute("async", true);
        googleMapScriptTag.setAttribute("defer", true);
        document.body.appendChild(googleMapScriptTag);

        /* Bind this class's initMap to the window's one */
        window.initMap = this.initMap.bind(this);
    }

    initMap() {
        /* Initialize and show the map */
        this.map = new window.google.maps.Map(
            document.getElementById("map"),
            {
                center: { lat: -32.397, lng: 150.644 },
                zoom: 15
            }
        );

        /* Get Pontianak's Position and then go to there */
        let service = new window.google.maps.places.PlacesService(this.map);

        service.textSearch({ query: "Pontianak" }, (result) => {
            this.map.panTo(result[0].geometry.location);
        });

        console.log("Script succesfully loaded!");
    }

    render() {
        const mapStyle = {
            background:"green",
            width: "100%",
            height: "450px"
        };

        return (<div id="map" style={mapStyle}> </div>);
    }
}
