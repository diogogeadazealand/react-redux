import React from 'react';
import { connect } from 'react-redux';

import { sellLemonade, buyLemons } from '../actions';

class Inventory extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Lemonade: {this.props.lemons} <button onClick={this.props.sellLemonade} >Sell Lemonade</button> <button onClick={this.props.buyLemons}>Buy Lemons</button></h2>
                <h3>Total: {this.props.cash}</h3>
            </div>
        );
    }
}


function mapStateToProps (state) {
    return{
        lemons: state.lemons,
        cash: state.cash
    };
}

function mapDispatchtoProps (dispatch) {
    return {
        sellLemonade: () => { dispatch(sellLemonade()) },
        buyLemons: () => { dispatch(buyLemons()) }
    };
}

export default connect(mapStateToProps, mapDispatchtoProps)(Inventory);