import React from 'react';

class AddFishForm extends React.Component {

    handleChange = event => {
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
         };
        this.props.updateFish(this.props.id, updatedFish);
    }

    handleDelete = () => {
        this.props.deleteFish(this.props.id);
    }

    render() {
        const fish = this.props.fish;
        return (
            <div className="fish-edit">
                <input name="name" onChange={this.handleChange} value={fish.name} type="text"/>
                <input name="price" onChange={this.handleChange} value={fish.price} type="text"/>
                <select name="status" onChange={this.handleChange} value={fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={fish.desc}/>
                <input name="image" onChange={this.handleChange} value={fish.image} type="text"/>
                <button onClick={this.handleDelete}>Remove Fish</button>
            </div>
        )
    }
}

export default AddFishForm