import React from "react";
import KMLLayer from "./kml_layer.jsx";
import road_layer from "../kml/layer_jalan.kml";
import district_layer from "../kml/layer_kecamatan.kml";
import river_layer from "../kml/layer_sungai.kml";

export default class KMLLayerContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            kml_layers: [
                { resource: road_layer, isVisible: true },
                { resource: district_layer, isVisible: true },
                { resource: river_layer, isVisible: true }
            ]
        };

    }

    render() {

        /* Don't render if `map` hasn't been instantiated */
        let layers = null;
        if (this.props.map) {
            layers = this.state.kml_layers.map(
                (layer, index) => {
                    return <KMLLayer
                        resource={layer.resource}
                        isVisible={layer.isVisible}
                        map={this.props.map}
                        key={index} />
                    }
            );
        }


        return (<div> {layers} </div>);
    }
}
