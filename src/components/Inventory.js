import React from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({user});
            }
        });
    }

    authHandler = async (authData) => {
        const store = await base.fetch(this.props.storeId, {context: this});
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        this.setState({
            uid: authData.user.uid,
            owner: store.owner === authData.user.uid
        });
    }

    authErrorHandler = async (authData) => {
        console.log(authData);
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler).catch(this.authErrorHandler);
    }

    logout = async () => {
        await firebaseApp.auth().signOut();
        this.setState({
            uid: null,
            owner: null
        });
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        if (!this.state.owner) {
            return <div>
                <p>Sorry. You are not the owner of this store!</p>
                {logout}
            </div>
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                    updateFish={this.props.updateFish}
                    deleteFish={this.props.deleteFish}
                    key={key}
                    id={key}
                    fish={this.props.fishes[key]} />)
                )}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    storeId: PropTypes.string.isRequired,
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
};

export default Inventory;