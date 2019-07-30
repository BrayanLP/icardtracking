import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import { Firestore } from '../../config';
import { fetchCards } from '../../actions/cardAction';
import { getCards, getGrafic } from '../../reducers/cardReducer';


class Cards extends Component {
   constructor(props) {
      super(props)
      this.state = {
         count: 0
      }
      // this.addCard = this.addCard.bind()
   }
   componentWillMount() {
      // Cargando cards
      this.props.fetchCards()
   }
   prueba = () => {
      console.log('entre')
   }
   chartEvents = (props) => [
      {
         eventName: "select",
         callback({ chartWrapper }) {
            const { cards } = props
            const selected = chartWrapper.getChart().getSelection()[0].row
            console.log("Selected ", chartWrapper.getChart().getSelection());
            // this.prueba()
            console.log(cards)
            const filter = cards[selected]
            console.log(filter)
         }
      }
   ];
   // addCard = () => {
   //    const { count } = this.state
   //    console.log('agregar tarjeta')
   //    data.push([
   //       `OTROS${count + 1}`,
   //       'Fecha de Facturación',
   //       new Date(2019, 2, 4),
   //       new Date(2019, 2, 25),
   //    ])
   //    this.setState({ count: count + 1 })
   //    console.log(data)
   // }

   render() {
      const { grafic, cards } = this.props
      console.log('result: ', grafic, this.props)
      return (
         <Fragment>
            <center>
               <h1>Cards</h1>
               <button onClick={() => this.addCard()}>Agregar Tarjeta</button>
               <Chart
                  width={'95%'}
                  height={'600px'}
                  chartType="Timeline"
                  loader={<div>Loading Chart</div>}
                  data={grafic}
                  options={{
                     colors: ['#ff7800', '#00bb31', '#d81e05', '#072146', '#072146'],
                     timeline: { showRowLabels: true, colorByRowLabel: true },
                     avoidOverlappingGridLines: false,
                  }}
                  rootProps={{ 'data-testid': '4' }}
                  chartEvents={this.chartEvents(this.props)}
               />
            </center>
         </Fragment>
      );
   }
}

const mapStateToProps = state => ({
   grafic: getGrafic(state.cardReducer),
   cards: getCards(state.cardReducer)
})

const mapDispatchToProps = dispatch => ({
   fetchCards: () => dispatch(fetchCards())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
