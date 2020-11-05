## Nodejs Architecture

As an asynchronous event-driven JavaScript runtime (V8), Node.js is designed to build scalable network applications.

Install Node to your computer envirment (for macbook, brew install node), and go on.

## [Learn Nodejs](https://nodejs.dev/learn)

#### Differences between Node.js and the Browser
* Node.js has no DOM, or other Web Platform APIs like Cookies
* Node.js control the environment, supports filesystem access functionality, http server functionality and so on.
* Node.js supports ES6-7-8-9 JavaScript base on your Node.js version.
* Node.js use CommonJS module system (require), while browser embrace ES module (import)

#### The Node.js Event Loop
* The call stack

```
/**
 * The call stack is a LIFO queue (Last In, First Out).
 *
 * step2/step1 in stack, and step1/step2 out stack (invoke queue)
 */
function step1() { return 'hello'; }

function step2(param) { return param; }

step2(step1());
```

* The Message Queue (it is queued behind call stack, such as setTimeout, event handler)
* ES6 Job Queue (for Promise callback, also called microTask No need queued in Message Queue, executed right after the current call stack is empty)

#### Understanding process.nextTick()
nextTick is also not queued in Message Queue, but fast than Job Queue.

This is the [priority order](https://stackoverflow.com/questions/55467033/difference-between-process-nexttick-and-queuemicrotask):
* nextTick
* microTasks/job queue
* timers (expired)
* immediate

#### The Node.js [Event emitter](https://medium.com/developers-arena/nodejs-event-emitters-for-beginners-and-for-experts-591e3368fdd2)

#### Node.js [Streams & Buffer](https://medium.com/developers-arena/streams-and-buffers-in-nodejs-30ff53edd50f)
