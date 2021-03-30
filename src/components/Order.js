import React from 'react';
import { formatPrice } from '../helpers'

class Order extends React.Component {

    renderOrder = key => {

        if(this.props.fishes[key] && this.props.fishes[key].status === 'available') {
            return (
                <li key={key}>
                    <span>
                        <span className="count">
                            {this.props.order[key]}
                        </span>
                        lbs {this.props.fishes[key].name  }
                        <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
                    </span>
                    <span className="price">{formatPrice(this.props.fishes[key].price * this.props.order[key])}</span>
                </li>);
        }
        if (!this.props.fishes[key]) {
            return null
        }
        return (
            <li key={key}>
                Sorry, {this.props.fishes[key] ? this.props.fishes[key].name : 'fish'} is no longer available
            </li>
        );
    }

    render() {
        const total = Object.keys(this.props.order).reduce((acum, key) => {
            if (this.props.fishes[key] && this.props.fishes[key].status === 'available') {
                return acum + this.props.fishes[key].price * this.props.order[key];
            }
            return acum;
        }, 0)
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {Object.keys(this.props.order).map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order