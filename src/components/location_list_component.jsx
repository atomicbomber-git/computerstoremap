import React from "react";

export default class LocationListComponent extends React.Component {
    render() {
        let locations = this.props.locations.map((location, index) => {
            return (
                <div className="box" key={index}>
                    <p> <strong> Name: </strong> </p>
                    <p> {location.name} </p>
                    <p> <strong> Description: </strong> </p>
                    <p> {location.description} </p>

                </div>);
        });

        return (
            <div>
                {locations}
            </div>
        );
    }
}
