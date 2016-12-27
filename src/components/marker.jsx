import React from "react";

export default class Marker extends React.Component {
    componentDidMount() {
        if ( ! this.marker ) {
            console.log("Map" + this.props.map);
            console.log("Marker hasn't been created yet. Creating marker now...");

            const {latitude, longitude} = this.props.location;

            this.marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(latitude, longitude),
                map: this.props.map
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
        return (<div> </div>);
    }
}
