import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../css/modal_transition.css";

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
                            <form className="container">
                                <div className="control">
                                    <label className="label"> Nama: </label>
                                    <input className="input" type="text" value={this.props.formData.name}/>
                                </div>

                                <div className="control">
                                    <label className="label"> Latitude: </label>
                                    <input className="input" type="number" value={this.props.formData.lat}/>
                                </div>

                                <div className="control">
                                    <label className="label"> Longitude: </label>
                                    <input className="input" type="number" value={this.props.formData.lng}/>
                                </div>

                                <div className="control">
                                    <label className="label"> Deskripsi: </label>
                                    <textarea className="textarea" value={this.props.formData.desc}></textarea>
                                </div>
                            </form>
                        </section>

                        <footer className="modal-card-foot">
                            <a className="button is-primary"> Simpan </a>
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
