import React from "react";
import FileInputComponent from "./file_input_component.jsx";

export default class LocationFormComponent extends React.Component {
    constructor(props) {
        super(props);

        /* Default state */
        this.defaultState = {
            currentName: "",
            currentDesc: ""
        };

        this.state = this.defaultState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log({
            name: this.state.currentName,
            desc: this.state.currentDesc,
            lat: this.props.currentPos.lat,
            lng: this.props.currentPos.lng
        });
    }

    handleNameChange(e) {
        this.setState({ currentName: e.target.value });
    }

    handleDescChange(e) {
        this.setState({ currentDesc: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="control">
                    <label className="label"> Name: </label>
                    <input className="input" onChange={this.handleNameChange} value={this.state.currentName} type="text" placeholder="Location name"/>
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
                    <textarea onChange={this.handleDescChange} value={this.state.currentDesc} className="textarea" placeholder="Description"></textarea>
                </div>

                <div className="control">
                    <label className="label"> Upload Picture: </label>
                    <FileInputComponent className="button is-fullwidth"/>
                </div>

                <div className="control">
                    <button className="button is-primary">
                        Add Location
                    </button>
                </div>

            </form>
        );
    }
}
