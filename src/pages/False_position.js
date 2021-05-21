import React from 'react';
import { Input , Button } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import 'antd/dist/antd.css';
import '../css/style.css';
import axios from 'axios'
// import '../css/false_position.css';

let apiUrl = "http://localhost:4040/data/root/False_position?key=45134Asd4864wadfad"
// let apiUrl = "https://my-json-server.typicode.com/pudjapu/react_wep/root"

class False_position extends React.Component{

    state = {
        Equation: '',
        XL: '',
        XR: '',
        ERROR: 0.00001,
        result: '',
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

    // Get FX
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


    getsum = (e) =>{

        try{    
            const Parser = require('expr-eval').Parser; // ฟั่งชั้นแปลงสมการ
        let i;
        let arr = [];
        let err = 1;
        let Xnew;

        let Equation = this.state.Equation;
        let XL = this.state.XL;
        XL = parseFloat(XL);
        let XR = this.state.XR;
        XR = parseFloat(XR);
        let ERROR = this.state.ERROR;
        ERROR = parseFloat(ERROR);

        let Chart = [];

        var expression = Parser.parse(Equation);

        let X = ((XL*expression.evaluate({ x: XR }))-(XR*expression.evaluate({ x: XL })))/(expression.evaluate({ x: XR })-expression.evaluate({ x: XL }))
        
        for(i = parseFloat(this.state.XL)-0.1;i <= parseFloat(this.state.XR)+0.1;i=i+0.1){
            let P_X = expression.evaluate({ x: i })

            Chart.push({fx: P_X,y: 0,x: i.toFixed(2)})
        }

        if(expression.evaluate({ x: X }) > 0){
            XR = X;
        }
        else{
            XL = X;
        }

        i = 1;
        while(err > ERROR){
            Xnew = ((XL*expression.evaluate({ x: XR }))-(XR*expression.evaluate({ x: XL })))/(expression.evaluate({ x: XR })-expression.evaluate({ x: XL }))

            if(expression.evaluate({ x: Xnew })*expression.evaluate({ x: XR })){
                XR = Xnew
            }
            else{
                XL = Xnew
            }

            //((expression.evaluate({ x: Xnew })*expression.evaluate({ x: XR })) > 0) ? (XR = Xnew) : (XL = Xnew)
            arr.push(<div className='result' key={i}>Iteration {i} : {Xnew}</div>);
            err = Math.abs((Xnew-X)/Xnew);
            X = Xnew;
            i++;
        }
        this.setState({result: arr,Chart: Chart})
        } catch(e){
            this.setState({result : "No data"})
        }

        
    }

    render(){
        return(
            <div className="allincompro">
                <h2>False position</h2>
                <div>
                    <span className="Text_Input_2"> F<sub>X</sub> : </span><Input onChange={this.getEquation} className="Input" value={this.state.Equation}/> <br></br>
                    <span className="Text_Input_2"> X<sub>L</sub> : </span><Input onChange={this.getXL}  value={this.state.XL}/>    
                    <span className="Text_Input_2"> X<sub>R</sub> : </span><Input onChange={this.getXR}  value={this.state.XR}/>    <br></br>
                    <Button type="primary" onClick={this.getsum} >Submit</Button>   
                    <Button type="primary" danger onClick={this.getdata_} >Example</Button>    <br></br>
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

export default False_position;