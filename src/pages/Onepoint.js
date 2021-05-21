import React, { Component } from 'react'

import { Input } from 'antd';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../css/style.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// import '../css/one_point.css'
import axios from 'axios'
let apiUrl = "http://localhost:4040/data/root/One-point_iteration?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"
class Onepoint extends Component{

    state = {
        Equation: '',
        X: '',
        ERROR: 0.0001,
        result: '',
        Chart: ''
      };

      async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],X: data["x"],ERROR: data["error"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }
    
    getEquation = (e) => {
        this.setState({
            Equation: e.target.value,
        });
    };
    
    getX = (e) => {
        this.setState({
            X: e.target.value,
        });
    };

    show_value = (e) =>{

        try {
            const Parser = require('expr-eval').Parser;

        let i = 1;
        let arr = [];

        let Equation = this.state.Equation;
        let X = this.state.X;
        X = parseFloat(X);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);

        var expression = Parser.parse(Equation);

        let x1,error_1;
        let err = 99999999;
        
        let chart = [];

        while(err > ERROR){
            x1 = expression.evaluate({ x: X })
            error_1 = Math.abs((x1-X)/x1)

            if(err === error_1){
                break;
            }
            let Y = expression.evaluate({ x: x1 })
            chart.push({data: x1,y: Y});
            arr.push(<div className='result' key={i}>Iteration {i} : {x1}</div>);
            i++;

            err = error_1;
            X = x1;
        }
        if(arr.length === 0){
            this.setState({result: 'Is Diverge'})
        }
        else{
            this.setState({result: arr,Chart: chart})
        }
        } catch(e){
            this.setState({result : "No data"})
        }

        
    }

    render(){
        return(
            <div className="allincompro">
                <h2>One-point iteration</h2>
                <div>
                    <span>F<sub>x</sub></span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/>  <br></br>
                    <span className="Text_Input_2"> X<sub>Start</sub> : </span><Input onChange={this.getX} className="Input_2"value={this.state.X}/>  <br></br>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Submit</Button></span>
                    <span className="Calculate_Button"><Button type="primary" danger onClick={this.getdata_} >Example</Button></span>
                </div>
                {this.state.result}
                <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="data" />
                    <YAxis />
                    </LineChart>
            </div>
        )
    }

}

export default Onepoint;