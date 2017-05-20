import axios from 'axios';

import type { Action } from './types';
import { getRequest } from '../libs/requests';

export const FETCH_INVOICES = 'FETCH_INVOICES';


export function getInvoices(): Action {
  return dispatch => getRequest('/BookingCtrls/getInvoices')
    .then(result =>
      dispatch({
        type: FETCH_INVOICES,
        payload: result.invoices,
      }));
}
