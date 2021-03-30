import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    input = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        const store = this.input.current.value;
        this.props.history.push(`/store/${store}`);
    }

    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input ref={this.input} type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
                <button type="submit">Visit Store 🠖</button>
            </form>
        )
    }
}

export default StorePicker