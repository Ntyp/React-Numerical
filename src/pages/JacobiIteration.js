import React, { Component } from 'react'
import {Matrix} from '../components/Matrix'
import 'antd/dist/antd.css';
import '../css/style.css';
import { Input , Button } from 'antd';

import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/Jacobi_iteration?key=45134Asd4864wadfad"
function Jacobi(a,b,x,error_,_error) {

    let wow = false;
    let coss = 1;
    let data = [];
    let aws = [];

    let x_old = [...x];

    for(let i = 0;i < error_.length;i++){
        if(error_[i] > _error){
            wow = true;
        }
    }

    while(wow){
        
        x_old = [...x];

        for(let i = 0;i < a.length;i++){
            x[i] = b[i];
            for(let j = 0;j < a[0].length;j++){
                if(i !== j){
                    x[i] = x[i]- (a[i][j]*x_old[j])
                }
            }
            x[i] = x[i]/a[i][i];
            error_[i] = (x[i]-x_old[i])/x[i]
        }

        for(let i = 0;i < error_.length;i++){
            if(error_[i] > 10){
                return <div>ไม่มีคำตอบ</div>
            }
        }
        aws = [];
        aws.push(<div key={coss}>Iteration {coss}</div>)
        for(let i = 0;i < x.length;i++){
            aws.push(<div key={coss}>x{coss} : {x[i]} error : {error_[i]}</div>);
        }
        data.push(aws);

        wow = false;

        for(let i = 0;i < error_.length;i++){
            if(error_[i] > _error){
                wow = true;
            }
        }

    }

    return data;
}
class JacobiIteration extends Component{

    state = {
        rows: 2,
        columns: 2,
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
        let error_ = [];

        for(let i=0;i< Matrix.length;i++){
            b.push(Matrix[i][Matrix.length])
            b[i] = parseFloat(b[i])
            a.push(Matrix[i])
            a[i].pop()
            for(let j = 0;j < Matrix.length;j++){
                a[i][j] = parseFloat(a[i][j])
            }
            x.push(1);
            error_.push(9999);
        }

        let answer = Jacobi(a,b,x,error_,parseFloat(this.state.ERROR))

        this.setState({X: answer})


    }

    render(){
        return(
            <div className='allincompro'>
                <h2>Jacobi Iteration</h2>
                <Button className='Button_' type="primary" onClick={this.AddMatrix}>+</Button>
                <Button className='Button_' type="primary" danger onClick={this.DelMatrix}>-</Button>
                <Button className='Button_' type="primary" onClick={this.Calculate}>Submit</Button>
                <Button type="primary" danger onClick={this.getdata_} >Example</Button>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                <div>{this.state.X}</div>
            </div>
        );
    }
}

export default JacobiIteration