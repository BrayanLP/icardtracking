import { FETCH_CARD_PENDING, FETCH_CARD_SUCCESS, FETCH_CARD_ERROR, FETCH_GRAFIC_SUCCESS } from '../actions/cardAction';
const initialState = {
   pending: false,
   cards: [],
   error: null
}

export function cardReducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_CARD_PENDING:
         return {
            ...state,
            pending: true
         }
      case FETCH_CARD_SUCCESS:
         return {
            ...state,
            pending: false,
            cards: action.cards
         }
      case FETCH_GRAFIC_SUCCESS:
         return {
            ...state,
            pending: false,
            grafic: action.grafic
         }
      case FETCH_CARD_ERROR:
         return {
            ...state,
            pending: false,
            error: action.error
         }
      default:
         return state;
   }
}


export const getCards = state => state.cards;
export const getGrafic = state => state.grafic;
export const getCardsPending = state => state.pending;
export const getCardsError = state => state.error;