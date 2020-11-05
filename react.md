## Reactjs Architecture
* Declarative
* Component-Based
* Learn Once, Write Anywhere (Server render, RN)

#### Component
Component is the fundamental of React.

More further, function is the core fundamental of React.

It is Data-UI reflect.

It has two core concepts to maintain UI and UI react, that is `props` and `state`.

`props` is access from top and shouldn't be changed inner, `state` is maintained inner which is active.

Any of them updated (`props` updated by its ancestor) will cause entire componet (include it children) re-render.

All React components must act like pure functions with respect to their props.

But ancestor `state` can pass as `props` to its offspring.

So, the primitive question is, 

how to maintain `state`? Hooks or Lifecycle?

How to implement performance since entire componet (including offspring components) will re-render after `props` or `state` updated? React.memo vs shouldComponentUpdate?

How to code spliting? dynamic import directly or use library `import loadable from '@loadable/component'`?

* Function Components (also known as Stateless Components, Presentational Components, which concerned with how things look.)

```
/**
 * Pure function, no lifecycle
 *
 * But when hooks involved, it will take all advantage of React.Component,
 * that is another big feature to explain separately.
 */
const StatelessHello = (props) => (<div>hello</div>);

/**
 * React.memo is similar to React.PureComponent, to optimize function component
 *
 * It take shallow equal to props to determine if re-render needed.
 * Of course, you can take deep equal handy by function `areEqual`
 *
 * Refer to [React.memo](https://reactjs.org/docs/react-api.html#reactmemo)
 */
export default React.memo(StatelessHello, [areEqual]);
```
* Pure Component (you'd better consider it as Presentational Components)

```
/**
 * Prevents re-rendering of Component if props and state is the same
 * Takes care of “shouldComponentUpdate” implicitly
 * 通过 shallowEqual 来判断是否需要重新渲染
 */
class PureHello extends React.PureComponent {
  // implement shouldComponentUpdate implicitly
  render（）{ 
    return <h1> Welcome </h1> 
  }
}
```

* Container Components (also called Stateful Components, which concerned with how things work.)

```
/**
 * React Components re-renders in the following scenarios:
 * 1. “setState” is called in Component, and it is asynchronous
 * 2. “props” values are updated, and it is only updated by parent component
 * 3. this.forceUpdate() is called, and it will skip checking the logic in shouldComponentUpdate
 */

class StandardComponent extends React.Component {
  // Mounting lifecycle
  constructor(props) {
    super(props);
    this.state = {};
  }

  // both Mounting & Updating lifecycle
  getDerivedStateFromProps(nextProps, prevState) {

  }

  // Updating lifecycle
  shouldComponentUpdate(nextProps, nextState) {
    // return false will prevent re-render even setState called or props updated
    if (nextProps.menu === this.props.menu && nextState.counter === this.state.counter) {
      return false;
    }
  }

  // Mounting lifecycle
  componentDidMount() {
    this.setState((prevState, props) => ({}), callback);
  }

  // Updating lifecycle
  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }

  // Unmounting lifecycle
  componentWillUnmount() {
    // remove event listener
  }

  // both Mounting & Updating lifecycle
  render() {
    // this will render null or <span/>
    return (
      <div>hello
        { this.state.name && <span>this.state.name</span> }
      </div>
    );
  }
}
```

#### Component architecture (Component Compose)
* Import & Compose component directly
* Pass component as props
* this.props.children is similarly to slot

#### Component communication
* From parent to child: pass props
* From child to parent: pass props function from parent to child, execute at child
* From ancestor to offspring: use react context
* Communication between separate components: use EventEmitter

Of course, react-redux is the most popular way.

#### Data Flow (How Components/App maintain data flow)
* one way data flow from up to down
* passing function to child component and lift up data to ancestor, and then flow down
* use global `Store` to control the whole app data, such as Redux

#### Cross-Cutting Concern (also known as Aspect Oriented Programming)

Higher Order Component is a classic way to enhance components special feature.

And React Hooks is another way.

```
/**
 * redux connect & react-router withRouter are classic HOC, React.memo, React.lazy too.
 *
 * HOC is to particularly enhanced existing components for a special aspect
 *
 * Here is a demonstration for enhance WrappedComponent funtionality to access local storage
 */
function withHigherOrderComponent(WrappedComponent, options) {

  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {}

    componentDidMount() {}

    getDataFromStorage() {}

    saveToStorage() {}

    render() {
      return <WrappedComponent getDataFromStorage saveToStorage {...options} />
    }
  }
}

const EnhancedComponent = withHigherOrderComponent(WrappedComponent);
```

#### Utils
  - pure functions to use anywhere

## Redux Architecture
* The Single Immutable State Tree (单一的不可变的状态树)
* Describing State Changes with Actions (用actions来描述状态的改变)
* The Reducer Function return the new state (reducer函数产生新的状态)
* Middleware (a function before destination) is easily injected, such as redux-thunk

```
// a counter reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// Implementing Redux from Scratch
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    // root re-render
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({}); // dummy dispatch

  return { getState, dispatch, subscribe };
};

const store = createStore(counter);

store.dispatch({type: 'INCREMENT', payload: data});
```

## ReactNative Architecture

Using JavaScriptCore as engine.

JavaScript is the bridge between UI and native platform (iOS, Android)

RN Components with inline styles, different app router from web.

## React Hooks
Hooks are functions that let you “hook into” React features from function components, with the purpose for replacement of container components lifecycle to reuse stateful logic between components.

Hooks are JavaScript functions, but they impose two additional rules:

* Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks from React function components. or your own custom Hooks.

Because of Hooks behind a scope of array register. such as [...allState] and [...allStateHandlers]

#### State Hook

`useState` instead of `this.state` and `this.setState` from container components.

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### Effect Hook

`useEffect` could be consider as `componentDidMount`, `componentDidUpdate` and `componentWillUnmout` combined. By default, it runs both after the first render and every update.

That means use side effect after every component render.

It is no browser painting blocking.

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;

    return () => {
      // this will invoke after component unmout and every time after re-render
      // that means when re-render, invoke here and then reuse effect main callback
    }
    // only count state updated will cause this effect
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### Layout Effect Hook

`useLayoutEffect` is similar to `useEffect`, and will be invoke after every render, but before browser painting. just at the DOM ready. It is painting block and before `useEffect`.

#### Memo Hook

```
// It is similar to observer, only recalculate when params changed
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

#### Callback Hook

```
// It is similar to observer, only recalculate when params changed, but return a function 
const memoizedFn = useCallback(() => computeExpensiveValue(a, b), [a, b]);

const memoizedValue = memoizedFn();
```

#### Custom Hook

```
/**
 * Define custom hooks to extract reuse logic combine the built-in hooks
 */
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

## React Project Architecture

Create React App make you focus on code, not build tools for single page application.

It provides a project structure, and combines common build usecase, such as dotenv, css/module.css/scss, image assets.

It borned with:
* react
* react-dom

You should add other library to consummate you project:
* redux
* redux-thunk
* react-redux
* react-router-dom (React route could be consider as a component that receive a pecial prop: path)

Commonly the [structure](https://reactjs.org/docs/faq-structure.html) could be:
* src
  - App.js
  - api
  - actions for redux
  - reducers
  - pure-components/common-components
  - components
    - user feature
    - product feature
    - split core concern to special feature
  - HOC/Hooks/middleware to handle cross cutting concern
  - routes
  - utils
  - styles
