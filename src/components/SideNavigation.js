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
            <SideNav expanded={show} style={{'background-color': '#17A2B8'}}
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
                <SideNav.Nav defaultSelected="/dashboard">
                    <NavItem eventKey="/">
                        <NavIcon>
                            <FaHome/>
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/dashboard">
                        <NavIcon>
                            <GoDashboard/>
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/algos">
                        <NavIcon>
                        <GiProcessor/>
                        </NavIcon>
                        <NavText>
                            Algos
                        </NavText>
                        <NavItem eventKey="/algos/all">
                            <NavText>
                                All
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="/algos/top">
                            <NavText>
                                Top
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="/algos/bottom">
                            <NavText>
                                Bottom
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default withRouter(SideNavigation);