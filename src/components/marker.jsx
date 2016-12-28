import React from "react";
import storeIcon from "../icons/store.svg";

export default class Marker extends React.Component {
    componentDidMount() {
        if ( ! this.marker ) {
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            /* Update location */
            const {latitude, longitude} = nextProps.location;

            this.marker.setPosition(new window.google.maps.LatLng(latitude, longitude));
        }
    }

    componentWillUnmount() {
        /* Unmounting. Destroying marker... */
        this.marker.setMap(null);
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
