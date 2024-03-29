import React, { Component } from 'react'
import 'antd/dist/antd.css';
import '../css/style.css';

import { Input , Button } from 'antd';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import axios from 'axios'

let apiUrl = "http://localhost:4040/data/root/Secant?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"

class Secant extends Component{

    state = {
        Equation: "",
        X_1: '',
        X_2: '',
        ERROR: 0.0001,
        result: '',
        Chart: ''
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],X_1: data["x1"],X_2: data["x2"],ERROR: data["error"]})

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
            X_1: e.target.value,
        });
    };

    getX_2 = (e) => {
        this.setState({
            X_2: e.target.value,
        });
    };

    show_value = (e) =>{
        try{
            const Parser = require('expr-eval').Parser;

        let i = 1;
        let arr = [];

        let Equation = this.state.Equation;
        let X_1 = this.state.X_1;
        X_1 = parseFloat(X_1);
        let X_2 = this.state.X_2;
        X_2 = parseFloat(X_2);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);
        let Chart = [];

        var expression = Parser.parse(Equation);

        let d = X_1 - X_2;
        let Fan,Xnew;
        let err_ = 1;

        while(err_ > ERROR){
            X_2 = X_1 + d;
            Fan = - ((expression.evaluate({x: X_2})*(X_1-X_2))/(expression.evaluate({x: X_1})-expression.evaluate({x: X_2})))
            Xnew = X_2 + Fan;

            err_ = Math.abs((Xnew-X_1)/Xnew);
            arr.push(<div className='result' key={i}>Iteration {i} : {Xnew}</div>);
            X_1 = Xnew;
            i++;
        }

        for(i = parseFloat(this.state.X_1)-0.1;i <= parseFloat(this.state.X_1)+1;i=i+0.1){
            let P_X = expression.evaluate({ x: i })

            Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
        }

        this.setState({result: arr,Chart: Chart})
        } catch(e){
            this.setState({result : "No data"})
        }
        

    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Secant</h2>
                <div>
                    <span>F<sub>x</sub></span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/>  <br></br>
                    <span className="Text_Input_2"> X<sub>1</sub> : </span><Input onChange={this.getX} className="Input_2" value={this.state.X_1} />  <br></br>
                    <span className="Text_Input_2"> X<sub>2</sub> : </span><Input onChange={this.getX_2} className="Input_2"  value={this.state.X_2}/>  <br></br>
                    <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Submit</Button></span>
                    <span className="Calculate_Button"><Button type="primary" danger onClick={this.getdata_} >Example</Button></span>
                </div>
                {this.state.result}
                <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <Line type="monotone" dataKey="fx" stroke="#FF0000" dot={false}/>
                    <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    </LineChart>
            </div>
        )
    }
}

export default Secant