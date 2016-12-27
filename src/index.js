import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../node_modules/bulma/css/bulma.css";
import "./css/font-awesome.css";

/* Home made components */
import LocationForm from "./components/location_form.jsx";
import LocationList from "./components/location_list.jsx";
import Marker from "./components/marker.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.defaultCurrentPos = { name: "", lat: "", lng: "", desc: "" };
        this.defaultFormError = { name: "", lat: "", lng: "", desc: "" };

        this.state = {
            locations: [],
            map: null,
            currentPos: this.defaultCurrentPos,
            formError: this.defaultFormError,
            isFormBeingSubmitted: false
        };

        this.backendURL = "http://localhost/gis/gis_new";

        this.setPosition = this.setPosition.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.clearFormFields = this.clearFormFields.bind(this);
        this.gotoLocation = this.gotoLocation.bind(this);
    }

    componentDidMount() {
        this.fetchLocations();
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
        const map = new window.google.maps.Map(
            document.getElementById("map"), { zoom: 15 }
        );

        this.setState({ map: map });

        /* Get Pontianak's Position and then go to there */
        let service = new window.google.maps.places.PlacesService(map);

        service.textSearch({ query: "Pontianak" }, (result) => {
            this.defaultPosition = result[0].geometry.location;
            map.setCenter(this.defaultPosition);

            this.pointerMarker = new window.google.maps.Marker({
               position: this.defaultPosition,
               map: map
           });
        })

        /* Handle clicks */
        map.addListener("click", (e) => {
            this.setPosition(e.latLng.lat(), e.latLng.lng());

            if (this.pointerMarker != null) {
                this.pointerMarker.setPosition(e.latLng);
            }

        });

        console.log("The Google Maps API script has been succesfully loaded!");
    }

    fetchLocations() {
        axios.get(`${this.backendURL}/locations`)
            .then((response) => {
                /* AJAX request successful */
                this.setState({
                    locations: response.data
                });
            })
            .catch(function(error) {

            });
    }

    gotoLocation(lat, lng) {
        this.state.map.panTo({lat, lng});
    }

    clearFormFields() {
        this.setState({ currentPos: this.defaultCurrentPos });
    }

    clearFormError() {
        this.setState({ formError: this.defaultFormError });
    }

    setPosition(lat, lng) {
        this.setState({ currentPos: { ...this.state.currentPos, lat: lat, lng: lng } });
    }

    /* Functions related to the new location input form */
    handleLatChange(e) {
        this.setState({ currentPos: { ...this.state.currentPos, lat: e.target.value }});
    }

    handleLngChange(e) {
        this.setState({ currentPos: { ...this.state.currentPos, lng: e.target.value }});
    }

    handleDescChange(e) {
        this.setState({ currentPos: { ...this.state.currentPos, desc: e.target.value }});
    }

    handleNameChange(e) {
        this.setState({ currentPos: { ...this.state.currentPos, name: e.target.value } });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        /* Attempt to save the location to the server */
        this.setState({ isFormBeingSubmitted: true });

        axios.post(`${this.backendURL}/save_location`, this.state.currentPos)
            .then((response) => {
                this.setState({ isFormBeingSubmitted: false });
                this.clearFormError();
                this.clearFormFields();
                this.fetchLocations();
            })
            .catch((error) => {
                this.setState({ isFormBeingSubmitted: false });

                if (error.response) {
                    this.setState({ "formError": error.response.data });
                }

            });
    }

    handleDeleteLocation(id) {
        axios.get(`${this.backendURL}/delete_location/${id}`)
            .then((response) => {
                console.log("Success");
                this.fetchLocations();
            })
            .catch((error) => { console.log("Error") });


        console.log("Detected " + id);
    }

    render() {

        const listStyle = {
            "height": "500px",
            "padding": "10px",
            "overflow": "auto"
        };

        const mapStyle = {
            background:"green",
            width: "100%",
            height: "450px"
        };

        /* Don't create any markers at all if the map hasn't been instantiated yet */
        let markers = null;
        if ( this.state.map ) {
            markers = this.state.locations.map((location, index) => {
                return (<Marker map={this.state.map} location={location} key={location.id}/>);
            });
        }

        return (
            <div>
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Peta Persebaran Toko Komputer di Kota Pontianak
                            </h1>
                            <h2 className="subtitle">
                                Antonius Yonathan,
                                Esra Martogi Aprianto Silitonga,
                                Annisa Natassya,
                                Andini Afriyanti Lestari
                            </h2>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-one-quarter">
                                <h2 className="title is-4"> Tambah Lokasi </h2>
                                <LocationForm
                                    handleLatChange={this.handleLatChange}
                                    handleLngChange={this.handleLngChange}
                                    handleDescChange={this.handleDescChange}
                                    handleNameChange={this.handleNameChange}
                                    handleFormSubmit={this.handleFormSubmit}
                                    isFormBeingSubmitted={this.state.isFormBeingSubmitted}
                                    formError={this.state.formError}
                                    currentPos={this.state.currentPos} addLocation={this.addLocation}/>
                            </div>
                            <div className="column">
                                <h2 className="title is-4"> Peta </h2>
                                <div id="map" style={mapStyle}> </div>
                                {markers}
                            </div>
                            <div className="column is-one-quarter">
                                <h2 className="title is-4"> Daftar Lokasi </h2>
                                <div style={listStyle}>
                                    <LocationList
                                        gotoLocation={this.gotoLocation}
                                        locations={this.state.locations}
                                        handleDeleteLocation={this.handleDeleteLocation}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
