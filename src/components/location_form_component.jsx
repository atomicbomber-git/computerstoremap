import React from "react";
import FileInputComponent from "./file_input_component.jsx";

export default class LocationFormComponent extends React.Component {
    buttonStyle() {
        return this.props.isFormBeingSubmitted ? "button is-primary is-fullwidth is-loading" : "button is-primary is-fullwidth";
    }

    render() {
        return (
            <form onSubmit={this.props.handleFormSubmit}>
                <div className="control">
                    <label className="label"> Name: </label>
                    <input className="input" onChange={this.props.handleNameChange} value={this.props.currentPos.name} type="text" placeholder="Location name"/>
                </div>

                <div className="control">
                    <label className="label"> Latitude: </label>
                    <input onChange={this.props.handleLatChange} value={this.props.currentPos.lat} type="number" className="input" placeholder="Latitude"/>
                </div>

                <div className="control">
                    <label className="label"> Longitude: </label>
                    <input onChange={this.props.handleLngChange} value={this.props.currentPos.lng} type="number" className="input" placeholder="Longitude"/>
                </div>

                <div className="control">
                    <label className="label"> Description: </label>
                    <textarea onChange={this.props.handleDescChange} value={this.props.currentPos.desc} className="textarea" placeholder="Description"></textarea>
                </div>

                <div className="control">
                    <label className="label"> Upload Picture: </label>
                    <FileInputComponent className="button is-fullwidth"/>
                </div>

                <div className="control">
                    <button className={this.buttonStyle()}>
                        Add Location
                    </button>
                </div>

            </form>
        );
    }
}
