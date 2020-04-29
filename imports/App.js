import React from 'react'
import ReactDOM from 'react-dom'
import "./App.css"
import CanvasJSReact from './canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends React.Component {
    constructor(props){
        super(props);
        this.dataPoints0 = [];
        this.dataPoints1 = [];
        this.dataPoints2 = [];
        this.dataPoints3 = [];
        this.dataPoints4 = [];
        this.dataPoints5 = [];
        this.dataPoints6 = [];
        this.state = {
            isRoom0:false,
            isRoom1:false,
            isRoom2:false,
            isRoom3:false,
            isRoom4:false,
            isRoom5:false,
            isRoom6:false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.addData = this.addData.bind(this);
    }

    // Adds data points onto graph where this is called after requesting for data from Server (within Method.call)
    addData(data) {
        let dataPoints = [];
        for (let i = 0; i < data.length;i++) {
            dataPoints.push({
                x: new Date(data[i].timestamp),
                y: Number(data[i].temperature),
            })
        }
        return dataPoints;
    }

    // This will sends information on the roomID to server and server will return appropriate data back 
    // Not sure why I need the setState part (because if I delete it, the line on the graph doesn't show up)
    handleClick(room){
        Meteor.call("getInfo",room,(error,response) => {})

        Meteor.call("retrieveData",(err,res)=>{
            if (err) {
                console.log("error",err);
            }

            if (room == 0) {
                this.dataPoints0 = this.addData(res);
                this.setState(state=> ({
                    isRoom0: !this.state.isRoom0
                }));
            }else if (room == 1){
                this.dataPoints1 = this.addData(res);
                this.setState(state=> ({
                    isRoom1: !this.state.isRoom1
                }));
            }else if (room == 2){
                this.dataPoints2 = this.addData(res);
                this.setState(state=> ({
                    isRoom2: !this.state.isRoom2
                }));
            }else if (room == 3){
                this.dataPoints3 = this.addData(res);
                this.setState(state=> ({
                    isRoom3: !this.state.isRoom3
                }));
            }else if (room == 4){
                this.dataPoints4 = this.addData(res);
                this.setState(state=> ({
                    isRoom4: !this.state.isRoom4
                }));
            }else if (room == 5){
                this.dataPoints5 = this.addData(res);
                this.setState(state=> ({
                    isRoom5: !this.state.isRoom5
                }));
            }else if (room == 6){
                this.dataPoints6 = this.addData(res);
                this.setState(state=> ({
                    isRoom6: !this.state.isRoom6
                }));
            }
        });
    }

    render(){
        // Set up what you need for CanvasJS to produce the graph
        // Refer to CanvasJS for more details 
        const options = {
            zoomEnabled:true,
            title: {
              text: "Line Chart"
            },
            axisY:{
              title:"Temperature (Celsius)"
            },
            axisX:{
                title:"Date"
            },
            data: [{				
                    type: "line",
                    dataPoints: this.dataPoints0,
                    legendText: "Room 0",
                    showInLegend: true, 
                },{
                    type:"line",
                    dataPoints:this.dataPoints1,
                    legendText: "Room 1",
                    showInLegend: true, 
                 },{				
                    type: "line",
                    dataPoints: this.dataPoints2,
                    legendText: "Room 2",
                    showInLegend: true, 
                },{				
                    type: "line",
                    dataPoints: this.dataPoints3,
                    legendText: "Room 3",
                    showInLegend: true, 
                },{				
                    type: "line",
                    dataPoints: this.dataPoints4,
                    legendText: "Room 4",
                    showInLegend: true, 
                },{				
                    type: "line",
                    dataPoints: this.dataPoints5,
                    legendText: "Room 5",
                    showInLegend: true, 
                },{				
                    type: "line",
                    dataPoints: this.dataPoints6,
                    legendText: "Room 6",
                    showInLegend: true, 
                },
            
            ]
         }

        return(
            <div className ="container">
                <h1>Rooms</h1>
                <div className="rooms">
                    <div className="circle" id="room0" onClick={() => this.handleClick(0)}>0</div>
                    <div className="circle" id="room1" onClick={() => this.handleClick(1)}>1</div>
                    <div className="circle" id="room2" onClick={() => this.handleClick(2)}>2</div>
                    <div className="circle" id="room3" onClick={() => this.handleClick(3)}>3</div>
                    <div className="circle" id="room4" onClick={() => this.handleClick(4)}>4</div>
                    <div className="circle" id="room5" onClick={() => this.handleClick(5)}>5</div>
                    <div className="circle" id="room6" onClick={() => this.handleClick(6)}>6</div>
                </div>
                
                <div className="chart">
                    <CanvasJSChart options = {options}/>
                </div>

                <h1>Inputs</h1>
                <div className ="inputs">
                    <div className ="start">
                        <label for="Start">Start: </label>
                        <input type="date" id="startdate" name="startdate" max="2013-10-02"/>
                        <input type="time" id="starttime" name="starttime"/>
                    </div>
                    <div className="end">
                        <label for="End">End: </label>
                        <input type="date" id="enddate" name="enddate" max="2013-11-07"/>
                        <input type="time" id="endtime" name="endtime"/>
                    </div>
                    <input type="range" id="points" name="points" min="0" max="10"/>

                   
                </div>
            </div>
        )
    }
}

export default App