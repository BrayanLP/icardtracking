import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import { Firestore } from '../../config';
import { fetchCards } from '../../actions/cardAction';
import { getCards, getGrafic } from '../../reducers/cardReducer';
import { Field, reduxForm } from 'redux-form'
import Modal from 'react-modal';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
   }
};

class Cards extends Component {
   constructor(props) {
      super(props)
      this.state = {
         count: 0
      }
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
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
   openModal() {
      this.setState({ modalIsOpen: true });
   }

   afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
   }

   closeModal() {
      this.setState({ modalIsOpen: false });
   }
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
               <button onClick={this.openModal}>Agregar Tarjeta</button>
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
               <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
               >

                  <h2 ref={subtitle => this.subtitle = subtitle}>Crear una tarjeta</h2>
                  <form>
                     <input name='title' placeholder='titulo' />
                     <select name='bank'>
                        <option value="interbank">Intebank</option>
                        <option value="bcp">BCP</option>
                        <option value="scotiabank">Scotiabank</option>
                        <option value="banco_falabella">Banco Falabella</option>
                     </select>
                     <input name='start_date' placeholder='fecha inicio' />
                     <input name='end_date' placeholder='fecha fin' />
                     <button>Crear</button>
                  </form>
               </Modal>
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

// Decorate with redux-form
Cards = reduxForm({
   form: 'createCard' // a unique identifier for this form
})(Cards)

Cards = connect(mapStateToProps, mapDispatchToProps)(Cards)

export default Cards