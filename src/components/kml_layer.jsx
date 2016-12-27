import React from "react";

export default class KMLLayer extends React.Component {
    componentDidMount() {
        /* Instantiate the layer and store it */
        if (this.props.map) {
            this.kmlLayer = new window.google.maps.KmlLayer(
                this.props.resource,
                {
                    preserveViewport: true,
                }
            );

            if (this.props.isVisible) {
                this.kmlLayer.setMap(this.props.map);
            }
            else {
                this.kmlLayer.setMap(null);
            }
        }
    }

    componentWillUpdate(nextProps) {
        if (this.kmlLayer) {
            if (nextProps.isVisible) {
                this.kmlLayer.setMap(this.props.map);
            }
            else {
                this.kmlLayer.setMap(null);
            }
        }
    }

    componentWillUnmount() {
        /* Destroy the layer */
        if (this.kmlLayer) {
            this.kmlLayer.setMap(null);
        }
    }

    render() {
        return null;
    }
}
