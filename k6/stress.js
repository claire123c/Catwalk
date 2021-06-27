import http from 'k6/http';
import { sleep, check, group } from 'k6';

export let options = {
  stages:[
    { duration: '5s', target: 1 }, //below normal
    { duration: '10s', target: 10 }, //normal
    { duration: '10s', target: 1000 }, //around breaking point
    { duration: '10s', target: 2000 }, //beyond breaking point
    { duration: '10s', target: 50 }, //scale down
  ],
};

const SLEEP_DURATION = 1;

export default function () {

  group('app startup', () => {
    const max = 1000011;
    const min = 1;
    const product_id = Math.round((Math.random() * (max - min)) + min);

    let getAll = http.get('http://localhost:3002/products');
    check (getAll, {
      'is status 200': (r) => r.status === 200,
      'is duration < 250ms': (r) => r.timings.duration < 250,
    })
    sleep(SLEEP_DURATION);

    let getOne = http.get(`http://localhost:3002/products/${product_id}`);
    check (getOne, {
      'is status 200': (r) => r.status === 200,
      'is duration < 250ms': (r) => r.timings.duration < 250,
    })
    sleep(SLEEP_DURATION);

    let getStyles = http.get(`http://localhost:3002/products/${product_id}/styles`);
    check (getStyles, {
      'is status 200': (r) => r.status === 200,
      'is duration < 250ms': (r) => r.timings.duration < 250,
    })
    sleep(SLEEP_DURATION);

    let getRelated = http.get(`http://localhost:3002/products/${product_id}/related`);
    check (getRelated, {
      'is status 200': (r) => r.status === 200,
      'is duration < 250ms': (r) => r.timings.duration < 250,
    })
    sleep(SLEEP_DURATION);
  })
}

