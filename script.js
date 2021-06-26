import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {

  const randomId = Math.round((Math.random() * 1000010) + 1);
  http.get('http://localhost:3002/products');
  sleep(1);
}