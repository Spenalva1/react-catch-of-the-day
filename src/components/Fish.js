import React from 'react';
import {formatPrice} from '../helpers';

class Fish extends React.Component {

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

export default Fish