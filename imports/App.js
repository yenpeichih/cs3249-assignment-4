import React from "react";
import ReactDOM from "react-dom";
import Datetime from "react-datetime";
import "./App.css";
import "./react-datetime.css";
import CanvasJSReact from "./canvasjs.react";
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.dataPoints0 = [];
    this.dataPoints1 = [];
    this.dataPoints2 = [];
    this.dataPoints3 = [];
    this.dataPoints4 = [];
    this.dataPoints5 = [];
    this.dataPoints6 = [];
    this.averageTemp0 = 0;
    this.averageTemp1 = 0;
    this.averageTemp2 = 0;
    this.averageTemp3 = 0;
    this.averageTemp4 = 0;
    this.averageTemp5 = 0;
    this.averageTemp6 = 0;
    this.state = {
      isRoom0: false,
      isRoom1: false,
      isRoom2: false,
      isRoom3: false,
      isRoom4: false,
      isRoom5: false,
      isRoom6: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.addData = this.addData.bind(this);
  }

  // Adds data points onto graph where this is called after requesting for data from Server (within Method.call)
  addData(data) {
    let dataPoints = [];
    for (let i = 0; i < data.length; i++) {
      dataPoints.push({
        x: new Date(data[i].timestamp),
        y: Number(data[i].temperature),
      });
    }
    return dataPoints;
  }

  // Calculates the average temperature of a room
  calculateAvgTemp(data) {
    let avgTemp = 0;
    let tempSum = 0;
    for (let i = 0; i < data.length; i++) {
      tempSum = tempSum + data[i].temperature;
    }
    avgTemp = tempSum / data.length;
    return avgTemp.toFixed(2);
  }

  // Sets the color of a room in the floor plan to reflect its average temperature
  setColor(averageTemp, roomNo) {
    let roomColor = "squareRoom0 squareTemp1";
    if (roomNo != 0) {
      roomColor = "squareRoomOthers squareTemp1";
    }
    if (averageTemp >= 14 && averageTemp <= 15.4) {
      if (roomNo == 0) {
        roomColor = "squareRoom0 squareTemp6";
      } else {
        roomColor = "squareRoomOthers squareTemp6";
      }
    } else if (averageTemp >= 15.5 && averageTemp <= 16.9) {
      if (roomNo == 0) {
        roomColor = "squareRoom0 squareTemp5";
      } else {
        roomColor = "squareRoomOthers squareTemp5";
      }
    } else if (averageTemp >= 17 && averageTemp <= 18.4) {
      if (roomNo == 0) {
        roomColor = "squareRoom0 squareTemp4";
      } else {
        roomColor = "squareRoomOthers squareTemp4";
      }
    } else if (averageTemp >= 18.5 && averageTemp <= 19.9) {
      if (roomNo == 0) {
        roomColor = "squareRoom0 squareTemp3";
      } else {
        roomColor = "squareRoomOthers squareTemp3";
      }
    } else if (averageTemp >= 20 && averageTemp <= 21.4) {
      if (roomNo == 0) {
        roomColor = "squareRoom0 squareTemp2";
      } else {
        roomColor = "squareRoomOthers squareTemp2";
      }
    }
    return roomColor;
  }

  // Sends information on the roomID to server and server will return appropriate data back
  handleClick(room) {
    Meteor.call("getInfo", room, (error, response) => {});

    Meteor.call("retrieveData", (err, res) => {
      if (err) {
        console.log("error", err);
      }

      if (room == 0) {
        this.dataPoints0 = this.addData(res);
        this.averageTemp0 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom0: !this.state.isRoom0,
        }));
      } else if (room == 1) {
        this.dataPoints1 = this.addData(res);
        this.averageTemp1 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom1: !this.state.isRoom1,
        }));
      } else if (room == 2) {
        this.dataPoints2 = this.addData(res);
        this.averageTemp2 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom2: !this.state.isRoom2,
        }));

        console.log(this.state.isRoom2);
      } else if (room == 3) {
        this.dataPoints3 = this.addData(res);
        this.averageTemp3 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom3: !this.state.isRoom3,
        }));
      } else if (room == 4) {
        this.dataPoints4 = this.addData(res);
        this.averageTemp4 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom4: !this.state.isRoom4,
        }));
      } else if (room == 5) {
        this.dataPoints5 = this.addData(res);
        this.averageTemp5 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom5: !this.state.isRoom5,
        }));
      } else if (room == 6) {
        this.dataPoints6 = this.addData(res);
        this.averageTemp6 = this.calculateAvgTemp(res);
        this.setState((state) => ({
          isRoom6: !this.state.isRoom6,
        }));
      }
    });
  }

  // Checks if the room is selected
  checkRooms() {
    if (this.state.isRoom0 == false) {
      this.dataPoints0 = [];
    }
    if (this.state.isRoom1 == false) {
      this.dataPoints1 = [];
    }
    if (this.state.isRoom2 == false) {
      this.dataPoints2 = [];
    }
    if (this.state.isRoom3 == false) {
      this.dataPoints3 = [];
    }
    if (this.state.isRoom4 == false) {
      this.dataPoints4 = [];
    }
    if (this.state.isRoom5 == false) {
      this.dataPoints5 = [];
    }
    if (this.state.isRoom6 == false) {
      this.dataPoints6 = [];
    }
  }

  render() {
    this.checkRooms();

    const options = {
      zoomEnabled: true,
      title: {
        text: "Line Chart",
      },
      axisY: {
        title: "Temperature (Celsius)",
      },
      axisX: {
        title: "Date",
      },
      data: [
        {
          type: "line",
          dataPoints: this.dataPoints0,
          legendText: "Room 0",
          showInLegend: true,
        },
        {
          type: "line",
          dataPoints: this.dataPoints1,
          legendText: "Room 1",
          showInLegend: true,
        },
        {
          type: "line",
          dataPoints: this.dataPoints2,
          legendText: "Room 2",
          showInLegend: true,
        },
        {
          type: "line",
          dataPoints: this.dataPoints3,
          legendText: "Room 3",
          showInLegend: true,
        },
        {
          type: "line",
          dataPoints: this.dataPoints4,
          legendText: "Room 4",
          showInLegend: true,
        },
        {
          type: "line",
          dataPoints: this.dataPoints5,
          legendText: "Room 5",
          showInLegend: true,
        },
        {
          type: "line",
          dataPoints: this.dataPoints6,
          legendText: "Room 6",
          showInLegend: true,
        },
      ],
    };

    console.log(this.dataPoints2);

    return (
      <div className="container">
        <h1>Rooms</h1>
        <div className="rooms">
          <div
            className={this.setColor(this.averageTemp0, 0)}
            id="room0"
            onClick={() => this.handleClick(0)}
          >
            0
          </div>
          <br></br>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp0}
          </div>
          <br></br>
          <div
            className={this.setColor(this.averageTemp1, 1)}
            id="room1"
            onClick={() => this.handleClick(1)}
          >
            1
          </div>
          <div
            className={this.setColor(this.averageTemp2, 2)}
            id="room2"
            onClick={() => this.handleClick(2)}
          >
            2
          </div>
          <div
            className={this.setColor(this.averageTemp3, 3)}
            id="room3"
            onClick={() => this.handleClick(3)}
          >
            3
          </div>
          <div
            className={this.setColor(this.averageTemp4, 4)}
            id="room4"
            onClick={() => this.handleClick(4)}
          >
            4
          </div>
          <div
            className={this.setColor(this.averageTemp5, 5)}
            id="room5"
            onClick={() => this.handleClick(5)}
          >
            5
          </div>
          <div
            className={this.setColor(this.averageTemp6, 6)}
            id="room6"
            onClick={() => this.handleClick(6)}
          >
            6
          </div>
          <br></br>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp1}
          </div>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp2}
          </div>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp3}
          </div>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp4}
          </div>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp5}
          </div>
          <div className="temp">
            Average: <br></br>
            {this.averageTemp6}
          </div>
        </div>

        <div className="chart">
          <CanvasJSChart options={options} />
        </div>

        <h1>Inputs</h1>
        <div className="inputs">
          <h1>Start Date-Time</h1>
          <Datetime className="start" />
          <h1>End Date-Time</h1>
          <Datetime className="end" />
          Sample Points
          <input type="range" id="points" name="points" min="0" max="10" />
        </div>
      </div>
    );
  }
}

export default App;
