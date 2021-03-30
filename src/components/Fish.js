import React from 'react';
import { PropTypes } from 'prop-types';
import {formatPrice} from '../helpers';

class Fish extends React.Component {
    static propTypes = {
        fish: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }).isRequired,
        addToOrder: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
    };

    addToOrder = () => {
        this.props.addToOrder(this.props.id)
    }

    render() {
        const {name, image, desc, status, price} = this.props.fish;
        const isAvailable = status === 'available'
        return (
            <li className="menu-fish">
                <img src={image} alt={`fish-${name}`}/>
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button onClick={this.addToOrder} disabled={!isAvailable}>{ isAvailable ? 'add to order' : 'sold out'}</button>
            </li>
        )
    }
}

export default Fish;