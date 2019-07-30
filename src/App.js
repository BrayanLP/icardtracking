import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { simpleAction } from './actions/simpleAction';
import { fetchProducts } from './actions/productAction'
import { getProducts } from './reducers/productReducer';
import Cards from './modules/Cards';
// import config from './config'
// import firebase from 'firebase/app';
class App extends Component {
  constructor(props) {

    super(props)
    // firebase.initializeApp(config)
  }
  // simpleAction = (event) => {
  //   this.props.simpleAction();
  //   this.props.fetchProducts()
  // }
  componentWillMount() {
    this.props.fetchProducts()
  }
  render() {
    const { products } = this.props
    return (
      <Fragment>
        <Cards></Cards>
      </Fragment>
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
