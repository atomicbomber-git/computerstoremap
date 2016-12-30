import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../node_modules/bulma/css/bulma.css";
import "./css/font-awesome.css";
import myLocationIcon from "./icons/my_location.svg";

/* Home made components */
import LocationForm from "./components/location_form.jsx";
import LocationList from "./components/location_list.jsx";
import Marker from "./components/marker.jsx";
import KMLLayerContainer from "./components/kml_layer_container.jsx";
import EditModal from "./components/edit_modal.jsx";
import ImageModal from "./components/image_modal.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.defaultCurrentPos = { name: "", lat: "", lng: "", desc: "" };
        this.defaultFormError = { name: "", lat: "", lng: "", desc: "" };
        this.defaultModalFormData = { id: "", name: "", lat: "0", lng: "0", desc: ""};

        this.state = {
            locations: [],
            map: null,
            currentPos: this.defaultCurrentPos,
            formError: this.defaultFormError,
            modalFormData: this.defaultModalFormData,
            imageModalData: { "id": "", "image": null, "imageFileName": null },
            isFormBeingSubmitted: false,
            isEditingLocation: false,
            isViewingImage: false,
            isModalCurrentlySubmitting: false,
            isImageCurrentlySubmitting: false
        };

        this.backendURL = "http://localhost/gis/api";

        this.setPosition = this.setPosition.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEditLocation = this.handleEditLocation.bind(this);
        this.handleViewImage = this.handleViewImage.bind(this);
        this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
        this.fetchLocations = this.fetchLocations.bind(this);
        this.clearFormFields = this.clearFormFields.bind(this);
        this.gotoLocation = this.gotoLocation.bind(this);
        this.stopEditingLocation = this.stopEditingLocation.bind(this);
        this.stopViewingImage = this.stopViewingImage.bind(this);

        this.handleModalLatChange = this.handleModalLatChange.bind(this);
        this.handleModalLngChange = this.handleModalLngChange.bind(this);
        this.handleModalDescChange = this.handleModalDescChange.bind(this);
        this.handleModalNameChange = this.handleModalNameChange.bind(this);
        this.handleModalFormSubmit = this.handleModalFormSubmit.bind(this);
        this.handleImageFileChange = this.handleImageFileChange.bind(this);
        this.handleImageFormSubmit = this.handleImageFormSubmit.bind(this);
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

        service.textSearch({ query: "pontianak" }, (result) => {
            this.defaultPosition = result[0].geometry.location;
            map.setCenter(this.defaultPosition);

            this.pointerMarker = new window.google.maps.Marker({
               position: this.defaultPosition,
               map: map,
               icon: myLocationIcon
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

    /* Turn off the editing mode */
    stopEditingLocation() {
        this.setState({ isEditingLocation: false });
    }

    stopViewingImage() {
        this.setState({ isViewingImage: false });
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

        this.setState({ isFormBeingSubmitted: true });

        /* Build FormData object from the current state */
        const formData = new FormData();
        const {name, lat, lng, desc} = this.state.currentPos;
        formData.append("name", name);
        formData.append("lat", lat);
        formData.append("lng", lng);
        formData.append("desc", desc);

        /* Attempt to submit the form to our backend service */
        axios.post(`${this.backendURL}/save_location`, formData)
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

    /* Functions related to the modal edit form */
    handleModalLatChange(e) {
        this.setState({ modalFormData: { ...this.state.modalFormData, lat: e.target.value }});
    }

    handleModalLngChange(e) {
        this.setState({ modalFormData: { ...this.state.modalFormData, lng: e.target.value }});
    }

    handleModalDescChange(e) {
        this.setState({ modalFormData: { ...this.state.modalFormData, desc: e.target.value }});
    }

    handleModalNameChange(e) {
        this.setState({ modalFormData: { ...this.state.modalFormData, name: e.target.value } });
    }

    handleImageFileChange(e) {
        this.setState({ imageModalData: {...this.state.imageModalData, image: e.target.files[0] }})
    }

    handleModalFormSubmit(e) {
        e.preventDefault();

        this.setState({ isModalCurrentlySubmitting: true });

        const {id, name, lat, lng, desc, image} = this.state.modalFormData;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("lat", lat);
        formData.append("lng", lng);
        formData.append("desc", desc);
        formData.append("image", image);

        axios.post(`${this.backendURL}/update_location/${id}`, formData)
            .then(
                (response) => {
                    this.setState({ isModalCurrentlySubmitting: false, isEditingLocation: false });
                    this.fetchLocations();
                }
            )
            .catch(
                (error) => {
                    this.setState({ isModalCurrentlySubmitting: false, isEditingLocation: false });
                    console.log(error);
                }
            );

    }

    handleImageFormSubmit(e) {
        e.preventDefault();
        this.setState({ isImageCurrentlySubmitting: true });

        /* Create a FormData object and submit it! */
        const formData = new FormData();
        const {id, image} = this.state.imageModalData;
        formData.append("image", image, image.name);

        axios.post(`${this.backendURL}/save_location_image/${id}`, formData)
            .then(
                (response) => {
                    this.setState({
                        isImageCurrentlySubmitting: false,
                        imageModalData: { id: "", "image": null, "imageFileName": response.data.filename }
                    });

                    this.fetchLocations();

                }
            )
            .catch(
                (error) => {
                    this.setState({ isImageCurrentlySubmitting: false, isViewingImage: false, imageModalData: { id: "", "image": null } });
                }
            );

    }

    handleEditLocation(id) {

        /* Find the relevant location's data */
        const location = this.state.locations.find((location) => {
            return location.id === id;
        });

        /* Adapt to match EditModal's props */
        const modalFormData = {
            id: location.id,
            name: location.name,
            lat: location.latitude,
            lng: location.longitude,
            desc: location.description
        };

        /* Update the state so the EditModal component knows it's time to it to show */
        this.setState({ isEditingLocation: true, modalFormData: modalFormData });
    }

    handleViewImage(id, imageFileName) {
        this.setState({ isViewingImage: true, imageModalData: { ...this.state.imageModalData, id: id, imageFileName: imageFileName} })
        console.log("View image!!! " + imageFileName);
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
            "overflow": "auto"
        };

        const mapStyle = {
            width: "100%",
            height: "450px"
        };

        /* Don't create any markers at all if the map hasn't been instantiated yet */
        let markers = null;
        if ( this.state.map ) {
            markers = this.state.locations.map((location, index) => {
                return (<Marker map={this.state.map} imageSource={this.backendURL + "/public/images"} location={location} key={location.id}/>);
            });
        }

        const map = (
            <div>
                <div id="map" style={mapStyle}>
                </div>
            </div>
        );

        return (
            <div>

                <EditModal
                    handleLatChange={this.handleModalLatChange}
                    handleLngChange={this.handleModalLngChange}
                    handleDescChange={this.handleModalDescChange}
                    handleNameChange={this.handleModalNameChange}
                    handleFormSubmit={this.handleModalFormSubmit}

                    formData={this.state.modalFormData}
                    isActive={this.state.isEditingLocation}
                    isSubmitting={this.state.isModalCurrentlySubmitting}
                    closeModal={this.stopEditingLocation}

                />

                <ImageModal
                    isActive={this.state.isViewingImage}
                    closeModal={this.stopViewingImage}
                    handleFormSubmit={this.handleImageFormSubmit}
                    handleFileChange={this.handleImageFileChange}
                    isSubmitting={this.state.isImageCurrentlySubmitting}
                    imageSource={this.backendURL + "/public/images"}
                    data={this.state.imageModalData}
                />

                <section className="hero is-primary">
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
                            <div className="column is-3">
                                <h2 className="title is-4"> Tambah Lokasi </h2>
                                <div className="box">
                                    <LocationForm
                                        handleLatChange={this.handleLatChange}
                                        handleLngChange={this.handleLngChange}
                                        handleDescChange={this.handleDescChange}
                                        handleNameChange={this.handleNameChange}
                                        handleFormSubmit={this.handleFormSubmit}
                                        isFormBeingSubmitted={this.state.isFormBeingSubmitted}
                                        formError={this.state.formError}
                                        currentPos={this.state.currentPos}
                                        addLocation={this.addLocation} />
                                </div>
                            </div>
                            <div className="column is-6">
                                <h2 className="title is-4"> Peta </h2>
                                <div className="box">
                                    <KMLLayerContainer map={this.state.map} />
                                    {map}
                                    {markers}
                                </div>
                            </div>
                            <div className="column is-3">
                                <h2 className="title is-4"> Daftar Lokasi </h2>
                                <div style={listStyle}>
                                    <LocationList
                                        gotoLocation={this.gotoLocation}
                                        locations={this.state.locations}
                                        handleDeleteLocation={this.handleDeleteLocation}
                                        handleEditLocation={this.handleEditLocation}
                                        handleViewImage={this.handleViewImage}
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
