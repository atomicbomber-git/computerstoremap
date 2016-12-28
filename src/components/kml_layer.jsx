import React from "react";

export default class KMLLayer extends React.Component {
    componentDidMount() {
        /* Instantiate the layer and store it */
        if (this.props.map) {
            this.kmlLayer = new window.google.maps.KmlLayer(
                this.props.resource,
                {
                    suppressInfoWindows: true,
                    preserveViewport: true
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

    componentWillReceiveProps(nextProps) {

        /* Don't do anything if isVisible doesn't change at all */
        if (this.props.isVisible === nextProps.isVisible) {
            return;
        }

        if (nextProps.isVisible) {
            this.kmlLayer.setMap(this.props.map);
        }
        else {
            this.kmlLayer.setMap(null);
        }

        console.log("Update!!!");
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
