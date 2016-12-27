import React from "react";
import Marker from "./marker.jsx";

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { map: null };
    }

    componentDidMount() {
        this.loadGoogleMapAPI();
    }

    render() {
        const mapStyle = {
            background:"green",
            width: "100%",
            height: "450px"
        };

        /* Don't create any markers at all if the map hasn't been instantiated yet */
        let markers = null;
        if ( this.state.map ) {
            markers = this.props.locations.map((location, index) => {
                return (<Marker map={this.state.map} location={location} key={location.id}/>);
            });
        }

        return (
            <div>
                <div id="map" style={mapStyle}></div>

                <div>
                    {markers}
                </div>
            </div>
        );
    }
}
