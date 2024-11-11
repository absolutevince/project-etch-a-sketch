export default (function pubsub() {
  const events = {};

  function sub(event, fn) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(fn);
  }

  function publish(event, ...value) {
    events[event].forEach((fn) => {
      fn(...value);
    });
  }

  return {
    sub,
    publish,
  };
})();
