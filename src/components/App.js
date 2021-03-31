import React from 'react';
import base from '../base';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {},
    }

    componentDidMount() {
        const {params} = this.props.match;
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
        this.setState({
            order: JSON.parse(localStorage.getItem(`${params.storeId}`)) || {}
        })
    }

    componentDidUpdate() {
        const {params} = this.props.match;
        localStorage.setItem(`${params.storeId}`, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    }

    updateFish = (key, fish) => {
        const fishes = {
            ...this.state.fishes,
            [key]: fish
        };
        this.setState({ fishes })
    }

    deleteFish = key => {
        const fishes = {
            ...this.state.fishes,
            [key]: null
        };
        this.setState({ fishes })
    }

    addToOrder = fishKey => {
        const order = { ...this.state.order };
        order[fishKey] = order[fishKey] + 1 || 1;
        this.setState({order})
    }

    deleteFromOrder = fishKey => {
        const order = { ...this.state.order };
        delete order[fishKey];
        this.setState({order})
    }

    loadSampleFishes = () => {
        let fishes = {...this.state.fishes};
        fishes = {
            ...fishes,
            ...sampleFishes
        }
        this.setState({ fishes });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul>
                        { Object.keys(this.state.fishes).map(key => <Fish key={key} id={key} addToOrder={this.addToOrder} fish={this.state.fishes[key]} />) }
                    </ul>
                </div>
                <Order deleteFromOrder={this.deleteFromOrder} order={this.state.order} fishes={this.state.fishes} />
                <Inventory
                    storeId={this.props.match.params.storeId}
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        )
    }
}

export default App;