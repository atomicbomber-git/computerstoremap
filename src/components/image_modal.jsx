import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../css/modal_transition.css";
import FileInput from "./file_input.jsx";

export default class ImageModal extends React.Component {
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
                            <p className="modal-card-title"> Foto Lokasi </p>
                            <button className="delete" onClick={this.props.closeModal}></button>
                        </header>

                        <section className="modal-card-body">

                            <div className="box">
                                <figure className="image is-2by1">
                                    <img src={this.props.imageSource + "/" + this.props.data.imageFileName} role="presentation"/>
                                </figure>
                            </div>

                            <form id="edit_form" onSubmit={this.props.handleFormSubmit}>
                                <div className="control">
                                    <label className="label"> Tambah / Ganti Gambar </label>
                                    <FileInput className="button" handleFileChange={this.props.handleFileChange}/>
                                </div>

                                <button form="edit_form" className={this.props.isSubmitting ? "button is-primary is-loading" : "button is-primary"}> Simpan </button>
                            </form>

                        </section>

                        <footer className="modal-card-foot">
                            <a className="button is-primary" onClick={this.props.closeModal}> Selesai </a>
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
