import React,{useState} from 'react';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {withRouter} from 'react-router-dom';
import {FaHome} from "react-icons/fa";
import {GiProcessor} from "react-icons/gi";
import {GoDashboard} from "react-icons/go";

function SideNavigation(props){
    const [show,setShow] = useState(false);
    return (
        <div>
            <SideNav expanded={show} style={{'background-color': '#000000'}}
                onSelect={(selected) => {
                    setShow(false)
                    console.log(selected)
                    props.history.push(selected)
                    
                }}
                onToggle={()=>{
                    setShow(show=>!show)
                }}
                >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="/">
                    <NavItem eventKey="/">
                        <NavIcon>
                            <h2><FaHome/></h2>
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/dashboard">
                        <NavIcon>
                            <h2><GoDashboard/></h2>
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/algos">
                        <NavIcon>
                        <h2><GiProcessor/></h2>
                        </NavIcon>
                        <NavText>
                            Algos
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default withRouter(SideNavigation);