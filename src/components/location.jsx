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

                <div className="control has-addons" style={navStyle}>

                    <button onClick={() => { this.props.handleEditLocation(this.props.id) }} className="button is-small">
                        Sunting
                        <span className="icon is-small">
                            <i className="fa fa-pencil"> </i>
                        </span>
                    </button>

                    <button onClick={() => { this.props.gotoLocation(latitude, longitude) } } className="button is-small">
                        Arahkan
                        <span className="icon is-small">
                            <i className="fa fa-map"> </i>
                        </span>
                    </button>

                    <button onClick={() => { this.props.handleDeleteLocation(this.props.id) } } className="button is-danger is-small">
                        Hapus
                        <span className="icon is-small">
                            <i className="fa fa-trash"> </i>
                        </span>
                    </button>

                </div>
            </div>
        );
    }
}
