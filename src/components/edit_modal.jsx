import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../css/modal_transition.css";
import FileInput from "./file_input.jsx";

export default class EditModal extends React.Component {
    componentDidMount() {
        this.escapeHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.escapeHandler);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isActive !== this.props.isActive) {
            if (!nextProps.isActive) {
                window.removeEventListener("keydown", this.escapeHandler);
            }
            else {
                window.addEventListener("keydown", this.escapeHandler);
            }
        }
    }

    handleKeyDown(e) {
        if (e.key === "Escape") {
            this.props.closeModal();
        }
    }

    render() {
        let modal = null;
        if (this.props.isActive) {
            modal = (
                <div className="modal is-active" key="1">
                    <div className="modal-background"> </div>
                    <div className="modal-content" style={{"maxWidth":  "400px"}}>

                        <header className="modal-card-head">
                            <p className="modal-card-title"> Sunting Data Lokasi </p>
                            <button className="delete" onClick={this.props.closeModal}></button>
                        </header>

                        <section className="modal-card-body">
                            <form id="edit_form" className="container" onSubmit={this.props.handleFormSubmit}>
                                <div className="control">
                                    <label className="label"> Nama: </label>
                                    <input className="input" type="text" onChange={this.props.handleNameChange} value={this.props.formData.name}/>
                                </div>

                                <div className="control">
                                    <label className="label"> Latitude: </label>
                                    <input className="input" type="number" onChange={this.props.handleLatChange} value={this.props.formData.lat}/>
                                </div>

                                <div className="control">
                                    <label className="label"> Longitude: </label>
                                    <input className="input" type="number" onChange={this.props.handleLngChange} value={this.props.formData.lng}/>
                                </div>

                                <div className="control">
                                    <label className="label"> Deskripsi: </label>
                                    <textarea className="textarea" onChange={this.props.handleDescChange} value={this.props.formData.desc}></textarea>
                                </div>

                                <div className="control">
                                    <label className="label"> Upload Gambar: </label>
                                    <FileInput handleFileChange={this.props.handleFileChange} className="button is-fullwidth"/>
                                </div>

                            </form>
                        </section>

                        <footer className="modal-card-foot">
                            <button form="edit_form" className={this.props.isSubmitting ? "button is-primary is-loading" : "button is-primary"}> Simpan </button>
                            <a className="button" onClick={this.props.closeModal}> Batal </a>
                        </footer>
                    </div>
                </div>
            );
        }

        return (
            <ReactCSSTransitionGroup
                transitionName="edit_modal"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                >
                {modal}
            </ReactCSSTransitionGroup>
        );
    }
}
