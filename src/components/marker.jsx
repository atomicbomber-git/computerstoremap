import React from "react";
import storeIcon from "../icons/store.svg";

export default class Marker extends React.Component {
    componentDidMount() {
        if ( ! this.marker ) {
            console.log("Map" + this.props.map);
            console.log("Marker hasn't been created yet. Creating marker now...");

            const {latitude, longitude} = this.props.location;

            this.marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(latitude, longitude),
                map: this.props.map,
                icon: storeIcon
            });

            this.marker.addListener("click", () => {
                this.infoWindow.open(this.props.map, this.marker);
            });

            this.infoWindow = new window.google.maps.InfoWindow({
                content: this.infoWindowNode
            });
        }

        console.log("Mounted!!!");
    }

    componentWillUnmount() {
        /* Unmounting. Destroying marker... */
        this.marker.setMap(null);

        console.log("Dismounted!!!");
    }

    render() {
        const infoWindowStyle = { display: "none" };

        return (
            <div style={infoWindowStyle}>
                <div ref={(infoWindowNode) => { this.infoWindowNode = infoWindowNode; }}>
                    <h3 className="title is-5 has-text-centered"> {this.props.location.name} </h3>
                    <p> <strong> Latitude: </strong> </p>
                    <p> {this.props.location.latitude} </p>
                    <p> <strong> Longitude: </strong> </p>
                    <p> {this.props.location.longitude} </p>
                    <p> <strong> Deskripsi: </strong> </p>
                    <p> {this.props.location.description} </p>
                </div>
            </div>
        );
    }
}
