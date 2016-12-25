import React from "react";
import FileInputComponent from "./file_input_component.jsx";

export default class LocationFormComponent extends React.Component {
    constructor(props) {
        super(props);

        /* Default state */
        this.defaultState = {
            formData: {
                currentName: "",
                currentLat: "",
                currentLng: "",
                currentDesc: "In vain have I struggled"
            }
        };

        this.state = this.defaultState;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

    componentDidMount() {
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.formData);
        return;
        this.props.addLocation(this.state.formData.currentName);


        // this.setState({ formData: { ...this.state.formData, currentName: "" } });
    }

    handleNameChange(e) {
        this.setState({ formData: { ...this.state.formData, currentName: e.target.value }});
    }

    handleLatChange(e) {
        this.setState({ formData: { ...this.state.formData, currentLat: e.target.value }});
    }

    handleLngChange(e) {
        this.setState({ formData: { ...this.state.formData, currentLng: e.target.value }});
    }

    handleDescChange(e) {
        this.setState({ formData: { ...this.state.formData, currentDesc: e.target.value }});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="control">
                    <label className="label"> Name: </label>
                    <input className="input" onChange={this.handleNameChange} value={this.state.formData.currentName} type="text" placeholder="Location name"/>
                </div>

                <div className="control">
                    <label className="label"> Latitude: </label>
                    <input onChange={this.handleLatChange} value={this.state.formData.currentLat} className="input" placeholder="Latitude"/>
                </div>

                <div className="control">
                    <label className="label"> Longitude: </label>
                    <input onChange={this.handleLngChange} value={this.state.formData.currentLng} className="input" placeholder="Longitude"/>
                </div>

                <div className="control">
                    <label className="label"> Description: </label>
                    <textarea onChange={this.handleDescChange} value={this.state.formData.currentDesc} className="textarea" placeholder="Description"></textarea>
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
