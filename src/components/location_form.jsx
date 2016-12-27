import React from "react";
import FileInput from "./file_input.jsx";

export default class LocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.getErrorData.bind(this);
    }

    buttonStyle() {
        return this.props.isFormBeingSubmitted ? "button is-primary is-fullwidth is-loading" : "button is-primary is-fullwidth";
    }

    getErrorData(errorProperty) {
        if (this.props.formError[errorProperty]) {
            return {
                style: "is-danger",
                help: <div className="help is-danger"> {this.props.formError[errorProperty]} </div>
            };
        }

        return {
            style: "input",
            help: ""
        };
    }

    render() {
        return (
            <form onSubmit={this.props.handleFormSubmit}>
                <div className="control">
                    <label className="label"> Name: </label>
                    <input className={this.getErrorData("name").style + " input"} onChange={this.props.handleNameChange} value={this.props.currentPos.name} type="text" placeholder="Location name"/>
                    {this.getErrorData("name").help}
                </div>

                <div className="control">
                    <label className="label"> Latitude: </label>
                    <input className={this.getErrorData("lat").style + " input"} onChange={this.props.handleLatChange} value={this.props.currentPos.lat} type="number" placeholder="Latitude"/>
                    {this.getErrorData("lat").help}
                </div>

                <div className="control">
                    <label className="label"> Longitude: </label>
                    <input className={this.getErrorData("lng").style + " input"} onChange={this.props.handleLngChange} value={this.props.currentPos.lng} type="number" placeholder="Longitude"/>
                    {this.getErrorData("lng").help}
                </div>

                <div className="control">
                    <label className="label"> Description: </label>
                    <textarea className={this.getErrorData("desc").style + " textarea"} onChange={this.props.handleDescChange} value={this.props.currentPos.desc} placeholder="Description"></textarea>
                    {this.getErrorData("desc").help}
                </div>

                <div className="control">
                    <label className="label"> Upload Picture: </label>
                    <FileInput className="button is-fullwidth"/>
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
