import React from "react";
import FlipMove from "react-flip-move";
import Location from "./location.jsx";

export default class LocationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ""
        };

        this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    }

    handleSearchStringChange(e) {
        console.log(e.target.value);
        this.setState({ searchString: e.target.value });
    }

    render() {
        const {searchString} = this.state;
        const isSearching = searchString === "" ? false : true;
        const searchRegExp = new RegExp(searchString, "i");

        let locations = this.props.locations
            .filter((location) => {
                if (isSearching) {
                    return location.name.match(searchRegExp);    
                }
                return true;
            })
            .map((location) => {
                return (
                    <Location
                        key={location.id}
                        id={location.id}
                        name={location.name}
                        location={location}
                        gotoLocation={this.props.gotoLocation}
                        handleEditLocation={this.props.handleEditLocation}
                        handleViewImage={this.props.handleViewImage}
                        handleDeleteLocation={this.props.handleDeleteLocation}
                    />
                );
            });

        const messageBox = isSearching ?
            (
                <div className="content">
                    <article className="message">
                        <div className="message-body">
                            <strong> Jumlah hasil pencarian: {locations.length} </strong>
                        </div>
                    </article>
                </div>
            ) :
            null;

        return (
            <div>
                <div className="box">

                    <h3 className="title is-6"> PENCARIAN </h3>

                    <form>
                        <div className="control">
                            <label className="label"> Nama Lokasi: </label>
                            <input onChange={this.handleSearchStringChange} className="input" placeholder="Nama lokasi..."/>
                        </div>

                        {messageBox}
                    </form>
                </div>
                <FlipMove>
                    {locations}
                </FlipMove>
            </div>
        );
    }
}
