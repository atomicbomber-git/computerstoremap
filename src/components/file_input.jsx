import React from "react";

export default class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.defaultFileName = "Tak ada file terpilih.";
        this.state = { "fileName": "Tak ada file terpilih." };

        this.onFileInputChange = this.onFileInputChange.bind(this);
    }

    onFileInputChange(e) {
        /* Call this so the parent knows that the file has been changed */
        this.props.handleFileChange(e);

        let fileName = null;

        if (e.target.value === "") {
            fileName = this.defaultFileName;
        }
        else {
            fileName = e.target.value;
        }

        this.setState( { "fileName": fileName } );
    }

    render() {
        const fileNameBoxStyle = {
            "marginBottom": "10px",
            "marginTop": "10px"
        }

        return (
            <div>
                <label htmlFor="file-input" className={this.props.className}>
                    Pilih File
                    <span className="icon is-small">
                        <i className="fa fa-folder-open"></i>
                    </span>
                </label>

                <input onChange={this.onFileInputChange} accept="image/*" style={ {"display": "none"} } id="file-input" className="file-input" type="file"/>

                <div style={fileNameBoxStyle}>
                    <label className="label"> File: </label>
                    <p style={{ "wordWrap": "break-word" }}> {this.state.fileName} </p>
                </div>
            </div>
        );
    }
}
