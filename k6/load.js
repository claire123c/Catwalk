import http from 'k6/http';
import { sleep, check, group } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // errors less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be under 2000ms
  },
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

