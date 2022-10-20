import "./styles.css";
import React from "react";

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { errorInfo: error };
  }
  componentDidCatch(error, errorInfo) {
    console.log("error", error);
    console.log("errorInfo", errorInfo);

    // this.setState({
    //   error: error,
    //   errorInfo: errorInfo
    // });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  handleClick = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error("I crashed!");
    }

    return (
      <h1 onClick={() => this.handleClick()}>Counter: {this.state.counter}</h1>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <p>App component</p>
      <ErrorBoundry>
        <BuggyCounter />
      </ErrorBoundry>
      <ErrorBoundry>
        <BuggyCounter />
      </ErrorBoundry>
    </div>
  );
}
