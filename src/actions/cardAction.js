import { Firestore } from "../config";
import * as moment from 'moment';


export const FETCH_CARD_PENDING = 'FETCH_CARD_PENDING';
export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS';
export const FETCH_GRAFIC_SUCCESS = 'FETCH_GRAFIC_SUCCESS';
export const FETCH_CARD_ERROR = 'FETCH_CARD_ERROR';

function fetchCardsPending() {
   return {
      type: FETCH_CARD_PENDING
   }
}

function fetchGraficSuccess(items) {
   return {
      type: FETCH_GRAFIC_SUCCESS,
      grafic: items
   }
}

function fetchCardsSuccess(items) {
   return {
      type: FETCH_CARD_SUCCESS,
      cards: items
   }
}


function fetchCardsError(error) {
   return {
      type: FETCH_CARD_ERROR,
      error: error
   }
}

export function fetchCards() {
   return dispatch => {
      dispatch(fetchCardsPending());
      const cards = Firestore.collection('cards').doc('FBxXowxojyjDJ6diD0ul').collection('cards')
      cards.onSnapshot((snapshot) => {
         const res = [
            [
               { type: 'string', id: 'Banco' },
               { type: 'string', id: 'Name' },
               { type: 'date', id: 'Start' },
               { type: 'date', id: 'End' },
            ]
         ]
         const cardsRes = []
         snapshot.forEach((doc) => {
            const data = doc.data()
            const start_date = data.start_date && data.start_date.seconds
            const end_date = data.end_date && data.end_date.seconds

            // console.log(new Date(start_date * 1000))

            res.push([
               data.bank,
               data.title,
               // moment(start_date).format('LLLL'),
               //moment(start_date).toDate(),
               new Date(start_date * 1000),
               new Date(end_date * 1000),
            ])
            cardsRes.push({ ...data, id: doc.id })

         });
         // console.log('resultado: ', res)
         dispatch(fetchGraficSuccess(res))
         dispatch(fetchCardsSuccess(cardsRes))
         return res

      }, (err) => {
         console.log('Error getting documents', err);
         dispatch(fetchCardsError(err));
      });
   }
}