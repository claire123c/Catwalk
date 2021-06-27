import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages:[
    { duration: '10s', target: 1 }, //below normal
    { duration: '10s', target: 10 }, //normal
    { duration: '10s', target: 50 }, //around breaking point
    { duration: '10s', target: 100 }, //beyond breaking point
    { duration: '10s', target: 10 }, //scale down
  ],
};

export default function () {
  const max = 1000011;
  const min = 1;
  const product_id = Math.round((Math.random() * (max - min)) + min);

  let res = http.get(`http://localhost:3002/products/${product_id}`);
  // let res = http.get('http://localhost:3002/products');

  check (res, {
    'is status 200': (r) => r.status === 200,
    'is duration < 250ms': (r) => r.timings.duration < 250,
  })

  sleep(1);
}

