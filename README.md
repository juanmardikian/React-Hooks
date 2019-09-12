[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# React Hooks

![](https://media.giphy.com/media/fdvhxNoDHfaZW/giphy.gif)

## Objectives

By the end of this, developers should be able to:

- Hook into state from a functional component.
- Hook into a Lifecycle method from a functional component.

## Preparation

1. Fork and clone this repository. 
1. Install dependencies with `npm install`.

## Hooks Introduction

React is a very popular framework. It is relatively easy to learn, it has given
front end developers more fluid control, and it might even be a tad fun. It is
still evolving however so you should expect to hear about new additions to the
technology as it gets a larger user base and pain points are identified.

One of those common points of frustration is sharing behaviour and state logic
between components. There have been different solutions to this problem over
the years, [Higher Order Components](https://reactjs.org/docs/higher-order-components.html), [Mixins](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html), [Render Props](https://reactjs.org/docs/render-props.html), but as of React 16.8
a new API has been added to help mitigate these problems. [React Hooks!](https://reactjs.org/docs/hooks-intro.html)

### Say Goodbye to Class Components

One of the biggest implications that Hooks will have on your application is
eliminating the need for class based components. React does not plan to remove
class components from the framework, but they are basically no longer needed if
you choose to embrace Hooks.

This is a good thing for React itself because lots of JavaScript developers
don't use classes as they are only a syntax on top of constructors and
prototypes. Now developers won't have to learn class syntax just to use React.
This also means we won't have to worry about binding `this` or using fat arrow
functions to avoid having to to it.

### How to Use Hooks

Before we convert the class components in this repo let's take a look at some
ways to use Hooks.

#### Hooking into State

The most common usage for Hooks is to be able to provide some state to a
functional component. Here is how we normally create some initial state for a
class component.

```javascript
constructor (props) {
  super(props)

  this.state = {
    counter: 0
  }
}
```

Let's see how we can achieve the same thing with Hooks. We won't be inside a
class anymore which will remove the need for `constructor`, `super`, and
referencing `this.`

```javascript
const [counter, setCounter] = useState(0)
```

Just like that we have provided an initial value of `0` for a variable called
`counter`, and we also get a function called `setCounter` that can update the
variable.

`useState` is a function we import from React that accepts a value to
set as the initial state, and it returns an array where the first element is
the initial value, and the second element is a function that can update that
value.

Creating the `counter` and `setCounter` variables grouped with square brackets
is essentially saying to take the array returned from `useState`, and the first
element should be the value of `counter` while the second element will be the
value of `setCounter.`

It's important to note the array destructuring involved with `useState`. The `useState` returns a data structure, which is equivalent to declaring an array with two elements:

```javascript
const colors = ['red', 'green'];
console.log(colors[0]);
=> 'red'
const [colorOne, colorTwo] = colors;
console.log(colorOne);
=> 'red'
console.log(colorTwo);
=> 'green'
```

#### Updating State with Hooks

Okay great, we have a variable holding the initial value of the state, and a
function that can update it. How do we use it? Normally it would involve
calling `setState`, but now we have a function that will directly update only
the one state variable it is linked to. So to use the `setCounter` function
from the previous example we could do something like this.

```javascript
setCounter(counter + 1)
```

We pass in the `counter` variable and add one to it to ensure the new value
will be one more than what `counter` was previously set to. We could pass in
any number to update the `counter` but it makes sense to do it this way if we
want the value to increase by one.

`setCounter` and `counter` were both created by the same invocation of
`useState` and therefore we don't need to tell `setCounter` what it should be
updating.

#### Hooking into Lifecycle Methods :rainbow:

Having a functional component that can update its own state variable is a
welcome change for React developers. If that was all Hooks provided it would be
great, but you may be wondering about the typical Lifecycle methods that we can
access from class components. Methods such as `componentDidMount`,
`componentDidUpdate`, etc.

Hooks haven't forgotten about those either and have provided a single function
that we can use to tell React about other code that should be running during
those Lifecycle method calls. The function is called `useEffect`. Let's see an
example of doing it from a class component.

```javascript
componentDidMount () {
  this.setState({ colors: [] })
}
```

Here we are letting React know that when the component has been rendered to the
DOM, it should trigger this HTTP request for getting whichever movie we need to
see. Now we can see how to achieve this with `useEffect`.

```javascript
useEffect(() => {
  setColors([]);
}, []);
```

As you can see it's not drastically different, but let's address all the
changes.

First, we are actually invoking `useEffect` which is slightly
different than how we handled `componentDidMount`. We get access to `useEffect`
by importing it directly from React, and then we invoke it ourselves and pass
in a callback function.

The callback function triggers the axios HTTP request which is mostly the same
except we don't need to use `this` anymore since we are no longer in a class
component. We can simply access the `props` directly.

The callback for our `.then` has changed a bit too. Now we are using a
`setColors` function instead of `setState`. Since `setColors` is linked to a
specific state variable we can simply pass in the new value we got back from
the API.

The last change is a bit strange. After the callback function, we pass an
additional argument to `useEffect`, an empty array. Why would we need to pass
in an empty array? The answer is a little tricky.

Now that we are using one function to replace all the Lifecycle methods we
would normally use, it comes with a caveat. `useEffect` is invoked every time
the component renders, which means if you modify the component's state inside
of `useEffect` it will trigger a re-render, which will in turn invoke
`useEffect` again! Essentially an endless loop of calling itself.

Luckily `useEffect` accepts an array of dependencies as the second argument.
The array should contain any objects that you want `useEffect` to depend on. If
any of the objects in that array are changed, that is when it will invoke
`useEffect` again. If there is no array present, `useEffect` will call itself
forever. If the array is empty, `useEffect` will only be called after the first
render of the component. Just what we need in this case.

#### One Hook to Rule Them All

The last thing you might be wondering about is normally we would put different
logic into the different Lifecycle methods and now we only have one function
that will Hook into all of those.

What if we want different code to run at different times during the life of our
component? The answer is to invoke `useEffect` multiple times with a different
set of dependency objects in that second argument. You can invoke it as many
times as you need from within the component and it will know when it should be
running that version of `useEffect` based on the changes to those dependency
objects.

## Demo: Convert the Colors Component

There are a few class components in this repo, let's start with the `Colors`
component.

Let's identify the pieces that will need to change. The most obvious change is
in how we define the component. We should be defining it as a function instead
of a class.

```diff
- class Colors extends Component {
+ const Colors = props => {
```

This change will also require us to alter how we are importing and
destructuring React. We won't need the Component class anymore, but we will
want to bring in the Hook functions we need access to.

```diff
- import React, { Component } from 'react'
+ import React, { useState, useEffect } from 'react'
```

Now onto our state. Instead of defining a state object, we want to invoke
`useState` for each value we need to start with. We also no longer have any
need for the `constructor` function.

```diff
- constructor (props) {
-   super(props)
-   this.state = {
-     color: null,
-     colors: [],
-   }
- }

+ const [color, setColor] = useState('rgb(0,0,0)')
+ const [colors, setColors] = useState([])
```

In our functional component, we want to invoke `useEffect` to supply code that
should be run during a Lifecycle method. So let's get rid of
`componentDidMount`. In the process we will alter how we access `props` and
we'll use our `setMovie` function instead of `setState` to update the `movie`
variable.

```diff
- componentDidMount () {
-   this.setState({ colors: ['rgb(0,0,0)'] }))
- }

+ useEffect(() => {
+   setColors(['rgb(0,0,0)'])
+ }, [])
```

We can't forget to pass an empty array as the second argument to `useEffect`,
this tells React to only run the callback on the first render of the component,
which replicates the behavior of using `componentDidMount`.

The final changes we need are to remove the reference to `render` since we're
inside a functional component we can simply `return` what we need from the
component, and any reference to `this` inside the JSX should be removed as
well. We also won't need to destructure `this.state` since our state values are
already in the variables we need them to be in.

```diff
- render () {
-   const { color } = this.state

+ const [color, setColor] = useState('rgb(0,0,0)');
```

```diff
- <p>Current Color: {this.state.color}</p>

+ <p>Current Color: {color}</p>
```

Better test it to make sure it still works!

## Code Along: Convert the Colors component to show many colors.

Now let's do the same for the `Colors` component together. It will be
mostly the same except for a small detail regarding how React handles events.

React wraps the Browser's native `event` with something called a
[SyntheticEvent](https://reactjs.org/docs/events.html#event-pooling). This is
to improve cross-browser support. For performance reasons React reuses the
`SyntheticEvent` objects by pooling them and since it needs to be reused it will
nullify all the properties (such as `event.target`) after the callback has been
invoked.

So if we need to access the `event`'s properties, for stopping page reloads, we can use a method called `event.preventDefault()`. This will:

> stop the screen from refreshing

## Lab: Convert the Colors component

- Add `useState` to initialize an empty colors array
- Add `useEffect` to initialize `colors` with one color
- Add a button that will append new colors to the state 
- Display colors in a flexbox that wraps
- Bonus: remove colors from state

Now time for you to try it out on your own! Use the working code we have and
the React docs if you get stuck. Be methodical and meticulous, lots of little
things that need to be changed.

## Additional Resources

- [React Docs for Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Hooks and Forms](https://medium.com/@geeky_writer_/using-react-hooks-to-create-awesome-forms-6f846a4ce57)
- [What exactly is useState?](https://stackoverflow.com/questions/53165945/what-is-usestate-in-react)
- [Why is my useEffect Hook executed in an endless loop?](https://www.andreasreiterer.at/react-useeffect-hook-loop/)
- [History of React and how it got to Hooks](https://itnext.io/why-reacts-hooks-api-is-a-game-changer-8731c2b0a8c)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.