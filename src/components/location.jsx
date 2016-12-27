import React from "react";

export default class Location extends React.Component {
    render() {
        const navStyle = {
            marginTop: "5px"
        };

        const {latitude, longitude} = this.props.location;

        return (
            <div className="box">
                <h3 className="title is-5 has-text-centered"> {this.props.location.name} </h3>
                <p> <strong> Latitude: </strong> </p>
                <p> {this.props.location.latitude} </p>
                <p> <strong> Longitude: </strong> </p>
                <p> {this.props.location.longitude} </p>
                <p> <strong> Deskripsi: </strong> </p>
                <p> {this.props.location.description} </p>
                <nav className="level" style={navStyle}>
                    <div className="level-right">
                        <div className="level-item">
                            <button onClick={() => { this.props.gotoLocation(latitude, longitude) } } className="button is-info is-small">
                                Arahkan
                                <span className="icon is-small">
                                    <i className="fa fa-map"> </i>
                                </span>
                            </button>
                        </div>
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
