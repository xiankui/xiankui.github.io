/**
 * Promise 极简实现
 */
function Promise(fn) {
  let value = null,
      callbacks = [],
      state = 'pending'; // fullfilled, rejected

  this.then = function(onFulfilled) {
    console.log('then-----------')
    if (state === 'pending') {
      callbacks.push(onFulfilled);
      return this;
    }

    return this;
  }

  /**
   * callback function resolve fire onFullfilled that pushed into callbacks at initialize
   */
  function resolve(newValue) {
    value = newValue;
    state = 'fullfilled';

    callbacks.forEach(callback => callback(value));
  }

  fn(resolve)
}

/**
 * callback function resolve is fired by async execute
 */
const handle = function(resolve, reject) {
  console.log('promise pending')
  setTimeout(function() {
    console.log('promise resolve')
    resolve('success')
  }, 1000);
};

/**
 * function p is instance of Promise
 * function handle excute sync
 */
const p = new Promise(handle);

/**
 * function p.then excute sync
 *
 * function onFullfilled is async as callback
 */
p.then(function onFulfilled(value) {
  console.log('fulfilled', value);
});
