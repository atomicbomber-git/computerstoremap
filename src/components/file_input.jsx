import React from "react";

export default class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "fileName": "No file selected." };

        this.onFileInputChange = this.onFileInputChange.bind(this);
    }

    onFileInputChange(e) {

        console.log(e.target.value);

        let fileName = null;
        if (e.target.value === "") {
            fileName = "No file selected";
        }
        else {
            fileName = e.target.value;
        }

        this.setState( { ...this.state, "fileName": fileName } );
    }

    render() {
        const fileInputStyle = {
            display: "none"
        };

        const fileNameBoxStyle = {
            "marginBottom": "6px",
            "marginTop": "6px"
        }

        const fileNameLabelStyle = {
            "wordWrap": "break-word",
        };

        return (
            <div>
                <label htmlFor="file-input" className={this.props.className}>
                    Upload Image
                    <span className="icon is-small">
                        <i className="fa fa-upload"></i>
                    </span>
                </label>

                <input onChange={this.onFileInputChange} style={fileInputStyle} id="file-input" className="file-input" type="file"/>

                <div style={fileNameBoxStyle}>
                    <label className="label"> Filename: </label>
                    <p style={fileNameLabelStyle}> {this.state.fileName} </p>
                </div>
            </div>
        );
    }
}
