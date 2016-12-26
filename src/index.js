import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../node_modules/bulma/css/bulma.css";
import "./css/font-awesome.css";

/* Home made components */
import LocationFormComponent from "./components/location_form_component.jsx";
import LocationListComponent from "./components/location_list_component.jsx";
import MapComponent from "./components/map_component.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.defaultCurrentPos = {
            name: "",
            lat: "",
            lng: "",
            desc: ""
        };

        this.state = {
            locations: [],
            currentPos: this.defaultCurrentPos,
            isFormBeingSubmitted: false
        };

        this.backendURL = "http://localhost/gis/gis_new";

        this.addLocation = this.addLocation.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.clearFormFields = this.clearFormFields.bind(this);
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
                console.log(error);
            });
    }

    clearFormFields() {
        this.setState({ currentPos: this.defaultCurrentPos });
    }

    addLocation(name) {
        this.setState({
            locations: this.state.locations.concat({ name: name })
        });
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

        console.log(this.state.currentPos);

        axios.post(`${this.backendURL}/save_location`, this.state.currentPos)
            .then((response) => {
                console.log(response)
                this.setState({ isFormBeingSubmitted: false });

                this.fetchLocations();
            })
            .catch((error) => {
                this.setState({ isFormBeingSubmitted: false });
                console.log(error);
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

    componentDidMount() {
        this.fetchLocations();
    }

    render() {

        const listStyle = {
            "height": "500px",
            "padding": "10px",
            "overflow": "auto"
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
                                <LocationFormComponent
                                    handleLatChange={this.handleLatChange}
                                    handleLngChange={this.handleLngChange}
                                    handleDescChange={this.handleDescChange}
                                    handleNameChange={this.handleNameChange}
                                    handleFormSubmit={this.handleFormSubmit}
                                    isFormBeingSubmitted={this.state.isFormBeingSubmitted}
                                    currentPos={this.state.currentPos} addLocation={this.addLocation}/>
                            </div>
                            <div className="column">
                                <h2 className="title is-4"> Peta </h2>
                                <MapComponent setPosition={this.setPosition} locations={this.state.locations} />
                            </div>
                            <div className="column is-one-quarter">
                                <h2 className="title is-4"> Daftar Lokasi </h2>
                                <div style={listStyle}>
                                    <LocationListComponent
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
