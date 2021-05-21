import React, { Component } from 'react';
import { Input , Button , Card , Table } from 'antd';
import 'antd/dist/antd.css';
import '../css/style.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import axios from 'axios'
 

let apiUrl = "http://localhost:4040/data/root/Bisection?key=45134Asd4864wadfad"
// var dataInTable = []
const columns = [
    {
      title: 'Iteration',
      dataIndex: 'iteration',
    },
    {
      title: 'Error',
      dataIndex: 'ERROR',
    },
    
  ];
  var dataInTable = []
 const Parser = require('expr-eval').Parser;
 function bisection( in_xl, in_xr, in_err,in_equa) {

    let arr = [];
    
    let Equation = in_equa;
    let XL = in_xl;
    XL = parseFloat(XL);
    let XR = in_xr;
    XR = parseFloat(XR);
    let ERROR = in_err;
    ERROR = parseFloat(ERROR);

    let Xmid = (XL+XR)/2;
    let XM = 0;
    let errer_sum = 1;

    var expression = Parser.parse(Equation);
    let result = expression.evaluate({ x: Xmid }) * expression.evaluate({ x: XR });

    (result < 0) ? (XL = Xmid) : XR = Xmid;

        while(errer_sum > ERROR){
            // this.createTable(ERROR);
            // // this.createTable(data['xl'], data['xr'], data['x'], data['error']);
            XM = (XL+XR)/2;

            result = expression.evaluate({ x: XM }) * expression.evaluate({ x: XR });

            (result < 0) ? (XL = XM) : (XR = XM);

            errer_sum = Math.abs((XM-Xmid)/XM);
            Xmid = XM;
            arr.push([XM,errer_sum]);
        }
        return arr;
}

class Bisection extends Component{

    state = {
        Equation: '',
        XL: '',
        XR: '',
        ERROR: 0.00001,
        result: '',
        resulttable:'',
        Chart: ''
      };


    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            this.setState({Equation: data["eqtion"],XL: data["xl"],XR: data["xr"],ERROR: data["error"]})

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

    getXL = (e) => {
        this.setState({
            XL: e.target.value,
        });
    };

    getXR = (e) => {
        this.setState({
            XR: e.target.value,
        });
    };


    show_value = (e) =>{
        try{
            const Parser = require('expr-eval').Parser;
            let Equation = this.state.Equation;

            var expression = Parser.parse(Equation);

            let data = bisection(this.state.XL,this.state.XR,this.state.ERROR,this.state.Equation);

            let i;
            let arr = [];

            let Chart = [];

            // Input Sum to Array
            for(i = 0; i < data.length;i++){
                arr.push(<div className='result' key={i}>Iteration {i+1} : {data[i][0]}</div>);
            }

            // for(i =0;i< data.length;i++){
            //     data_table.push(<div className='resulttable' key={i}>Iteration {i+1} : {data[i][0]}</div>)
            // }



            for(i = parseFloat(this.state.XL)-0.1;i <= parseFloat(this.state.XR)+0.1;i=i+0.1){
                let P_X = expression.evaluate({ x: i })

                Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
            }

            // resulttable:''
            //Set sum to result & Chart
            // this.createTable(data['xl'], data['xr'], data['x'], data['error']);
            this.setState({result: arr,Chart: Chart});
        } catch(error) {
            this.setState({result : "No data"})
        }
        
    }
    // const data_table = [
    //     {
    //       key: '',
    //       Iteration: '',
    //       ERROR: '',
    //     }
    //   ];

    render(){

        return(
            <div className="allinbisetion" >
                <div className="in_box">
                    <div className="col">
                    <Card>
                    <div className="Input-Data">
                        <h1><b>Bisection Method</b></h1>
                        <span>F<sub>X</sub> : </span><Input onChange={this.getEquation} className="Input" value={this.state.Equation} />        <br></br>
                        <span className="Text_Input_2"> X<sub>L</sub> : </span><Input onChange={this.getXL} className="Input_2" value={this.state.XL}/>     
                        <span className="Text_Input_2"> X<sub>R</sub> : </span><Input onChange={this.getXR} className="Input_2"  value={this.state.XR} />      <br></br> <br></br>
                        <span className="Calculate_Button"><Button type="primary" onClick={this.show_value} >Submit</Button></span>
                        <span className="Calculate_Button"><Button type="primary" danger onClick={this.getdata_} >Example</Button></span>
                    </div>
                    </Card>
                    </div>
                    
                    
                    {this.state.result} {/* Show Output */}
                    
                    <div className='Chart'>
                    <LineChart width={1200} height={300} data={this.state.Chart} margin={{ top: 5, right: 20, bottom: 5, left: 400 }}>
                    <Line type="monotone" dataKey="fx" stroke="#FF0000" dot={false}/>
                    <Line type="monotone" dataKey="y" stroke="#0000FF" dot={false}/>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    </LineChart>
                    {/* <Table columns={columns} dataSource={d} size="middle"></Table> */}
                    {/* <Table columns={columns} dataSource={data} size="middle" /> */}
                </div>
                </div>
            </div>

        );
    }
}
export default Bisection