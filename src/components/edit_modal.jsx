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
                        <div className="box">
                            <nav className="nav">
                                <div className="nav-left"></div>
                                <div className="nav-center">
                                    <div className="nav-item">
                                        <h1 className="title is-5"> Sunting Data Lokasi </h1>
                                    </div>
                                </div>
                                <div className="nav-right">
                                    <div className="nav-item">
                                        <button onClick={this.props.closeModal} className="delete"></button>
                                    </div>
                                </div>
                            </nav>

                            <div className="container">
                                <div className="control">
                                    <label className="label"> Latitude: </label>
                                    <input className="input" type="number"/>
                                </div>

                                <div className="control">
                                    <label className="label"> Latitude: </label>
                                    <input className="input" type="number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <ReactCSSTransitionGroup
                transitionName="edit_modal"
                transitionEnterTimeout="200"
                transitionLeaveTimeout="200"
                >
                {modal}
            </ReactCSSTransitionGroup>
        );
    }
}
