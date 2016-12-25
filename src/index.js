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
        this.state = {
            locations: []
        };

        this.addLocation = this.addLocation.bind(this);
    }

    addLocation(name) {
        this.setState({
            locations: this.state.locations.concat({ name: name })
        });
    }

    componentDidMount() {
        axios.get("http://localhost/gis/gis_new/")
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

    render() {
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
                                <LocationFormComponent addLocation={this.addLocation}/>
                            </div>
                            <div className="column">
                                <h2 className="title is-4"> Peta </h2>
                                <MapComponent locations={this.state.locations} />
                            </div>
                            <div className="column is-one-quarter">
                                <h2 className="title is-4"> Daftar Lokasi </h2>
                                <LocationListComponent locations={this.state.locations}/>
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
