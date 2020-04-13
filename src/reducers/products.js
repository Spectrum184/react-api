import * as Types from '../constants/ActionTypes';
import _ from 'lodash';

var initialState = [];

const products = (state = initialState, action) => {
    var { id, product } = action;

    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state]

        case Types.DELETE_PRODUCT:
            let index = _.findIndex(products, function (product) {
                return product.id === id;
            });

            state.splice(index, 1)
            return [...state];

        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];

        case Types.UPDATE_PRODUCT:
            let index1 = _.findIndex(products, function (product) {
                return product.id === action.product.id;
            });
            state[index1] = product;
            return [...state];

        default:
            return [...state];
    }
}

export default products;