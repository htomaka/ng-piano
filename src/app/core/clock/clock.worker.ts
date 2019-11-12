let timerID = null;
let interval = 100;

self.onmessage = function onMessage(e) {
  if (e.data === 'start') {
    console.log('starting');
    timerID = setInterval(() => postMessage('tick', 'http://localhost:4200'), interval);
  } else if (e.data.interval) {
    console.log('setting interval');
    interval = e.data.interval;
    console.log('interval=' + interval);
    if (timerID) {
      clearInterval(timerID);
      timerID = setInterval(() => postMessage('tick', 'http://localhost:4200'), interval);
    }
    // tslint:disable-next-line:triple-equals
  } else if (e.data === 'stop') {
    console.log('stopping');
    clearInterval(timerID);
    timerID = null;
  }
};

postMessage('hi there', 'http://localhost:4200');
