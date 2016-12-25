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
                zoom: 15
            }
        );

        /* Get Pontianak's Position and then go to there */
        let service = new window.google.maps.places.PlacesService(this.map);

        service.textSearch({ query: "Pontianak" }, (result) => {
            this.defaultPosition = result[0].geometry.location;
            this.map.setCenter(this.defaultPosition);

            this.pointerMarker = new window.google.maps.Marker({
               position: this.defaultPosition,
               map: this.map
           });
        })

        /* Handle clicks */
        this.map.addListener("click", (e) => {
            this.props.setPosition(e.latLng.lat(), e.latLng.lng());

            if (this.pointerMarker != null) {
                this.pointerMarker.setPosition(e.latLng);
            }

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
