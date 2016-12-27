import React from "react";
import KMLLayer from "./kml_layer.jsx";


export default class KMLLayerContainer extends React.Component {
    constructor(props) {
        super(props);

        /* KML Resources */
        const road_layer = "https://atomicbomber-git.github.io/filestore/kml/layer_jalan.kml";
        const district_layer = "https://atomicbomber-git.github.io/filestore/kml/layer_kecamatan.kml";
        const river_layer = "https://atomicbomber-git.github.io/filestore/kml/layer_sungai.kml";

        this.state = {
            kml_layers: [
                { label: "Layer Jalan", resource: road_layer, isVisible: true },
                { label: "Layer Kecamatan", resource: district_layer, isVisible: false },
                { label: "Layer Sungai", resource: river_layer, isVisible: true }
            ]
        };

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility(update_index) {
        /* Awesoooome */
        const new_kml_layers = this.state.kml_layers.map(
            (layer, index) => {
                if (index !== update_index) {
                    return layer;
                }

                return { ...layer, isVisible: !layer.isVisible }
            }
        );

        this.setState({ kml_layers: new_kml_layers });
    }

    render() {

        /*
            Render KMLLayer components.
        */
        let layers = [];
        if (this.props.map) {
            layers = this.state.kml_layers.map(
                (layer, index) => {

                    const kml = (
                        <KMLLayer
                            resource={layer.resource}
                            isVisible={layer.isVisible}
                            map={this.props.map}
                            key={index}
                            label={layer.label}
                         />
                    );

                    const control = (
                        <div className="level-item" key={index}>
                            <button onClick={() => { this.toggleVisibility(index); }} className="button is-primary"> {layer.label} </button>
                        </div>
                    );

                    return {
                        kml: kml,
                        control: control,
                    }
                }
            );
        }

        return (
            <div>
                <div className="level">
                    <div className="level-left">
                        {layers.map(layer => layer.kml)}
                    </div>
                </div>

                {layers.map(layer => layer.control)}
            </div>);
    }
}
