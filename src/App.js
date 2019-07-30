import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { simpleAction } from './actions/simpleAction';
import { fetchProducts } from './actions/productAction'
import { getProducts } from './reducers/productReducer';
class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
    this.props.fetchProducts()
  }
  componentWillMount() {

    this.props.fetchProducts()
  }
  render() {
    const { products } = this.props
    return (
      <div  >

        <button onClick={this.simpleAction}>Test redux action</button>
        <ol>
          {products.map((res, index) => {
            return (
              <li key={index + 1}>{res.name}</li>
            )
          })
          }
        </ol>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return ({
    products: getProducts(state.productsReducer)
  })
}
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
