import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Order extends React.Component {


    renderOrder = key => {
        const transitionOpts  = {
            classNames: "order",
            key,
            timeout: {enter: 500, exit: 500}
        }

        if(this.props.fishes[key] && this.props.fishes[key].status === 'available') {
            return (
                <CSSTransition {...transitionOpts}>
                    <li key={key}>
                        <span>
                            <TransitionGroup component="span" className="count">
                                <CSSTransition classNames="count" key={this.props.order[key]} timeout={{enter:500, exit:500}}>
                                    <span>
                                        {this.props.order[key]}
                                    </span>
                                </CSSTransition>
                            </TransitionGroup>
                            lbs {this.props.fishes[key].name  }
                            <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
                        </span>
                        <span className="price">{formatPrice(this.props.fishes[key].price * this.props.order[key])}</span>
                    </li>
                </CSSTransition>
            );
        }
        if (!this.props.fishes[key]) {
            return null
        }
        return (
            <CSSTransition {...transitionOpts}>
                <li key={key}>
                    Sorry, {this.props.fishes[key] ? this.props.fishes[key].name : 'fish'} is no longer available
                </li>
            </CSSTransition>
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
                <TransitionGroup component="ul" className="order">
                    {Object.keys(this.props.order).map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    deleteFromOrder: PropTypes.func.isRequired,
};

export default Order;