import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import Home from './Home';
import Edit from './Edit';

import './fonts/supertext/style.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/@blueprintjs/core/dist/blueprint.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      activeViewName: "Home" //or Edit
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  componentDidMount() {
    this.setupCanvas();
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  setupCanvas() {
    var canvas = document.getElementById('pixel-canvas');
    this.writeMessage(canvas);

    /*
    canvas.addEventListener('mousemove', function(evt) {
      var mousePos = this.getMousePos(canvas, evt);
      var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      this.writeMessage(canvas, message);
    }, false);
    */
  }

  writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    
    context.strokeStyle = "black"; // Draws the canvas border
    context.rect(0, 0, 1000, 1000);
    context.stroke();
    
    var countOfGridSquares = 600;
    var colors = ['red', 'blue', 'green'];  

    var step = 8;
    for (var x = 0; x <= countOfGridSquares; x++) {
        for(var y = 0; y <= countOfGridSquares; y++) {
          context.fillRect(x*step, y*step, 8, 8);
          context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        }
    }
  }

  changeActiveView(viewName) {
    this.setState({
      activeViewName: viewName
    });
  }

  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  renderView() {
    if (this.state.activeViewName === "Home") {
      return <Home />;
    } else {
      return <Edit />;
    }
  }

  render() {
    return (
      <Router>
          <div>
            <nav className="navbar pure-menu pure-menu-horizontal">
              <Link to="/" className="pure-menu-heading pure-menu-link">PixelPlace</Link>
            </nav>

            <Route exact path="/" component={Home} />
            <Route path="/edit" component={Edit} />
          </div>
        </Router>
    );
  }
}

export default App;
