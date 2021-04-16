import axios from 'axios';
import {STORE_CITIES} from '../Types';

let reqHeader = Object.assign({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export const getCities = () => {
  return dispatch => {
    return axios
      .get(
        'http://api.openweathermap.org/data/2.5/find?lat=23.68&lon=90.35&cnt=50&appid=ffb8c3decb6e7b68c36aca2d55c410ac',
        reqHeader,
      )
      .then(res => {
        if (res?.data?.list.length > 0) {
          dispatch({
            type: STORE_CITIES,
            payload: res?.data?.list,
          });
        }
        return Promise.resolve(res?.data);
      })
      .catch(e => {
        return Promise.reject(e);
      });
  };
};
