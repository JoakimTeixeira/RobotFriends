import React, { Fragment, Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { robots, searchField } = this.state;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (robots.length === 0) {
      return <h1 className="loading">Loading...</h1>;
    } else {
      return (
        <Fragment>
          <main className="main">
            <header className="header">
              <h1 className="header-title">RobotFriends</h1>
              <SearchBox searchChange={this.onSearchChange} />
            </header>
            <section className="card-list">
              <CardList robots={filteredRobots} />
            </section>
          </main>
        </Fragment>
      );
    }
  }
}

export default App;
