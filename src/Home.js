import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';
import { button, Icon } from '@blueprintjs/core';
//import { CopyToClipboard } from 'react-copy-to-clipboard';
import Nav from './Nav';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
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
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  componentDidMount() {
    this.setupCanvas();
  }

  instantiateContract() {
   const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    var pixelPropsInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
    //  simpleStorage.deployed("anvasName", 600, 600).then((instance) => {
      simpleStorage.deployed().then((instance) => {  
        pixelPropsInstance = instance
        //return pixelPropsInstance.UpdatePixels(333, "ff0000", "inPixelStatus", {from: accounts[0]});
      })
    })
  }
  
  setupCanvas() {
    var canvas = document.getElementById('pixel-canvas');
    this.drawGrid(canvas);
  }

  drawGrid(canvas, message) {
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

  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  render() {
    //@TODO: get actual values from contract
    const ethAvgPixelCost = 0.0002;
    const ethFundedAmt = 18.2910;
    const projectEdits = '1,291';

    return (
      <div className="App">
        <Nav />
        <div id="main" className="container">
            <div className="col">
                <div style={{ flexDirection: 'row', width: 300 }}>
                    <Link to="/edit">
                        <button type="button" className="pt-button pt-large pt-fill" style={{ width: 300 }}>
                        <span className="pt-icon-standard pt-icon-edit"></span>
                            Edit
                        </button>
                    </Link>

                    <Link to="#">
                        <button type="button" className="pt-button pt-large pt-fill" style={{ width: 300, marginTop: 20 }}>
                        <span className="pt-icon-standard pt-icon-play"></span>
                            Replay
                        </button>
                    </Link>
                </div>
            </div>
            <div className="col">
                <div id="pixel-canvas-wrapper">
                <canvas id="pixel-canvas" width="600" height="600" />
                </div>
            </div>
            <div className="col">
                <div className='panel'>
                    <h1>Project Details</h1>
                    <span>
                        <Icon iconName='document' className='ico' />
                        ethdenver project
                    </span>
                    <span>
                        <Icon iconName='align-left' className='ico' />
                        Hello ethdenver! Welcome to the first live demo of Pixel Place; the blockchain-enabled art project!
                    </span>

                    <h2 style={{ marginTop: 25 }}>Project Stats</h2>
                    <span>
                        <Icon iconName='dollar' className='ico' />
                        {`${ethAvgPixelCost} ETH/pixel`}
                    </span>
                    <span>
                        <Icon iconName='bank-account' className='ico' />
                        {`${ethFundedAmt} ETH funded`}
                    </span>
                    <span>
                        <Icon iconName='helper-management' className='ico' />
                        {`${projectEdits} project edits`}
                    </span>
                </div>

                <button type="button" className="pt-button pt-large pt-fill" style={{ width: 300 }}>
                    <Icon iconName='social-media' className='ico' />
                    Share Craft
                </button>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
