import React from "react";

export default class Location extends React.Component {
    render() {
        const navStyle = {
            marginTop: "5px"
        };

        return (
            <div className="box">
                <p> <strong> Name: </strong> </p>
                <p> {this.props.name} </p>
                <p> <strong> Description: </strong> </p>
                <p> {this.props.description} </p>
                <nav className="level" style={navStyle}>
                    <div className="level-left">
                        <div className="level-item">
                            <button onClick={() => { this.props.handleDeleteLocation(this.props.id) } } className="button is-danger is-small is-outlined">
                                Hapus
                                <span className="icon is-small">
                                    <i className="fa fa-remove"> </i>
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
