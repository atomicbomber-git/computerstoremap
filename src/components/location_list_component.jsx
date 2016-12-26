import React from "react";
import FlipMove from "react-flip-move";
import Location from "./location.jsx";

export default class LocationListComponent extends React.Component {
    render() {
        let locations = this.props.locations.map((location) => {
            return (
                <Location
                    key={location.id}
                    id={location.id}
                    name={location.name}
                    description={location.description}
                    handleDeleteLocation={this.props.handleDeleteLocation}
                />
            );
        });

        return (
            <div>
                <FlipMove>
                    {locations}
                </FlipMove>
            </div>
        );
    }
}
