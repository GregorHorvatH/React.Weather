import React from 'react';
import {connect} from 'react-redux';

// ********** Action creators **********
const addCity = (name) => {
    return {
        type: 'ADD_CITY',
        city: name
    };
};

// ********** Component **********
let AddCity = ({dispatch}) => {
    let input;
    return (
        <div>
            <form onSubmit={evt => {
                evt.preventDefault();
                if (input.value) {
                    dispatch(addCity(input.value));
                    input.value = '';
                }
            }}>
                <input
                    type="text"
                    placeholder="city name"
                    ref={node => {
                        input = node;
                    }}
                />
                <button>Add City</button>
            </form>
        </div>
    );
};
AddCity = connect()(AddCity);

export default AddCity;