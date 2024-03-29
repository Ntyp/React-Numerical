import React, { Component } from 'react'
import {Matrix} from '../components/Matrix'
import 'antd/dist/antd.css';
import '../css/style.css';
import { Input , Button } from 'antd';

import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/Conjugate_gradient_method?key=45134Asd4864wadfad"

var math = require('mathjs');

export function Conjugates(a,b,x,err){
    let r = math.multiply(-1,b);
    let coss = 1;
    let data = [];

    let d = math.multiply(-1,r)
    let ramda = math.multiply(math.multiply(-1,math.transpose(d)),r)/math.multiply(math.transpose(d),math.multiply(a,d));

    console.log("ramda : " + ramda.toString());

    for(let i = 0;i < x.length;i++){
        x[i] = x[i] + (d[i]*ramda);
    }

    let aws = [];
    aws.push(<div key={coss}>Iteration {coss}</div>)
    for(let i = 0;i < x.length;i++){
        aws.push(<div key={coss}>x{i+1} : {x[i]}</div>);
    }
    data.push(aws);
    coss++;
    let error_ = 99999999999999
    
    while(error_ > err){
        let error_old = error_;
        let temp = math.multiply(a,x);
        
        for(let i = 0;i < b.length;i++){
            r[i] = temp[i] - b[i];
        }

        let alpha =  math.multiply(math.multiply(math.transpose(r),a),d)/math.multiply(math.multiply(math.transpose(d),a),d)

        for(let i = 0;i < b.length;i++){
            d[i] = (r[i]*-1)+(alpha*d[i]);
        }
        let ramda = math.multiply(math.multiply(-1,math.transpose(d)),r)/math.multiply(math.transpose(d),math.multiply(a,d));


        for(let i = 0;i < x.length;i++){
            x[i] = x[i] + (d[i]*ramda);
        }

        aws = [];
        aws.push(<div key={coss}>Iteration {coss}</div>)
        for(let i = 0;i < x.length;i++){
            aws.push(<div key={coss}>x{i+1} : {x[i]}</div>);
        }
        data.push(aws);
        coss++;

        error_ = math.sqrt(math.multiply(math.transpose(r),r))
        if(error_ > error_old){
            return <div>ไม่มีคำตอบ</div>;
        }

    }
    return data;
}




class ConjugateGradient extends Component{

    state = {
        rows: 2,
        Matrix: [[],[]],
        X: [],
        ERROR: 0.0001
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))
            
            let row = data["row"];

            if(row > parseInt(this.state.rows)){
                let r = parseInt(this.state.rows);
                for(let i = r;i < row;i++){
                    this.AddMatrix();
                }
            }
            else{
                let r = parseInt(this.state.rows);
                for(let i = r;i > row;i--){
                    this.DelMatrix();
                }
            }
                
            this.setState({Matrix: data["Matrix"],ERROR: data["error"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }


    Input = (e) =>{
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseInt(arr[0])][parseInt(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }
    
    AddMatrix = (e) =>{
        
        let Matrix = this.state.Matrix;
        Matrix.push([]);
        this.setState({Matrix: Matrix})
        this.setState({rows: this.state.rows+1})
    }

    getERR= (e) => {
        this.setState({
            ERROR: e.target.value,
        });
    };

    DelMatrix = (e) =>{
        if(this.state.rows > 2){
            let i;
            this.setState({rows: this.state.rows-1})
            let Matrix = this.state.Matrix;
            Matrix.pop();
            for(i = 0;i < Matrix.length;i++){
                Matrix[i].pop();
            }
            this.setState({Matrix: Matrix})
        }
        
    }

    Calculate = (e) =>{
        let temp = this.state.Matrix;

        // copy array
        let Matrix = [];
        for (let i = 0; i < temp.length; i++)
            Matrix[i] = temp[i].slice();

        let a =[];
        let b = [];
        let x = [];

        for(let i=0;i< Matrix.length;i++){
            b.push(Matrix[i][Matrix.length])
            b[i] = parseFloat(b[i])
            a.push(Matrix[i])
            a[i].pop()
            for(let j = 0;j < Matrix.length;j++){
                a[i][j] = parseFloat(a[i][j])
            }
            x.push(0);
        }

        let answer = Conjugates(a,b,x,parseFloat(this.state.ERROR))

        this.setState({X: answer})


    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Conjugate gradient method</h2>
                <Button className='Button_' type="primary" onClick={this.AddMatrix}>+</Button>
                <Button className='Button_' type="primary" danger onClick={this.DelMatrix}>-</Button>
                <Button className='Button_' type="primary" onClick={this.Calculate}>Submit</Button>
                <Button type="primary" danger onClick={this.getdata_} >Example</Button>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                <div>{this.state.X}</div>
            </div>
        )
    }
}

export default ConjugateGradient;