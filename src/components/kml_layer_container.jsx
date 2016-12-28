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
                { label: "Layer Jalan", resource: road_layer, isVisible: false },
                { label: "Layer Kecamatan", resource: district_layer, isVisible: true },
                { label: "Layer Sungai", resource: river_layer, isVisible: false }
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
        let layers = null;
        if (this.props.map) {
            layers = this.state.kml_layers.map(
                (layer, index) => {

                    const kml = (
                        <KMLLayer resource={layer.resource} isVisible={layer.isVisible} map={this.props.map}
                            key={index} label={layer.label}
                         />
                    );

                    const control = (
                        <div className="level-item" key={index}>
                            <button
                                onClick={() => { this.toggleVisibility(index); }}
                                className={ layer.isVisible ? "button is-danger is-small" : "button is-primary is-small" }>
                                {layer.label}
                                <span className="icon is-small">
                                    <i className={ layer.isVisible ? "fa fa-eye-slash" : "fa fa-eye" }>
                                    </i>
                                </span>
                            </button>
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
                <div className="level" style={ {"padding": "10px"} }>
                    <div className="level-left">
                        <div className="level-item">
                            <h3 className="title is-6"> LAYER KML: </h3>
                        </div>
                        { layers ? layers.map(layer => layer.control) : <p> Loading... </p> }
                    </div>
                </div>

                { layers ? layers.map(layer => layer.kml) : null }
            </div>);
    }
}
