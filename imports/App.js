import React from 'react'
import ReactDOM from 'react-dom'
import "./App.css"
import moment from 'moment'
import {Data} from './api/data'
import CanvasJSReact from './canvasjs.react';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isToggleOn:false,

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        let postData = document.getElementById("startdate").value
        console.log(postData);

    }

    handleClick() {
        let info = 5;
        Meteor.call("getInfo",info,(error,response) => {})

        Meteor.call("retrieveData",(err,result)=>{
            if (err) {
                console.log("error",err);
            }
            console.log(result);
        });

        this.setState(state=> ({
            isToggleOn: !this.state.isToggleOn
        }));
       
    }

    render(){
        const options = {
            title: {
              text: "Line Chart"
            },
            data: [{				
                      type: "spline",
                      dataPoints: [
                          { label: "Apple",  y: 10  },
                          { label: "Orange", y: 15  },
                         
                      ]
             }]
         }

        return(
            <div className ="container">
                <h1>Rooms</h1>
                <div className="circle" id="room6" onClick={this.handleClick}></div>
                <CanvasJSChart options = {options}/>
              
    
                <h1>Inputs</h1>
                <div className ="inputs">
                    <div className ="start">
                        <label for="Start">Start: </label>
                        <input type="date" id="startdate" name="startdate" max="2013-10-02" onChange={this.handleChange}/>
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