import React from "react";

export default class KMLLayer extends React.Component {
    componentDidMount() {
        /* Instantiate the layer and store it */
        if (this.props.map) {
            console.log("Executed " + this.props.resource);
            this.kmlLayer = new window.google.maps.KmlLayer(
                this.props.resource,
                {
                    map: this.props.map
                }
            );

            console.log(this.kmlLayer);
        }
        else {
            console.log("Fail");
        }
    }

    componentWillUnmount() {
        /* Destroy the layer */
    }

    render() {
        return <p> Test Test Test </p>;
    }
}
