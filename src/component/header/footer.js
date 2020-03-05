import React from 'react';
import {Menu, Layout} from 'antd';
import './ant_mydefine.css'

const {Header} = Layout

class Footer extends React.Component {
    constructor() {
        super();
    }


    render() {
        return(
            <div style={{zIndex:100,minHeight:150,textAlign:"center",backgroundColor:'#060b28',marginBottom:-50}}>
                <div style={{position:"relative",top:30}}>
                <h2 style={{fontSize:16,color:'white',marginBottom:50}}>copyright©：CK&CGM&TSL</h2>
                <h3 style={{fontSize:13,color:'white'}}>Contact information: <a href="578045968@qq.com">578045968@qq.com</a>.</h3>
                </div>
            </div>
        )

    }
}

export default Footer

