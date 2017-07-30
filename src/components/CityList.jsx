import React from 'react';
import { Component } from 'react';
import City from './City.jsx';

class CityList extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const state = store.getState();
        const {cities} = state;

        return (
            <div className="row city-list">
                {
                    cities.map((city, index) =>
                        <City
                            key={index}
                            city={city}
                        />
                    )
                }
            </div>
        );
    }
}
CityList.contextTypes = {
    store: React.PropTypes.object
};

export default CityList;