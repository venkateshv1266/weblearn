import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import './Sidebar.css'

function Sidebar(props) {
    const dispatch = useDispatch(); 
    const signOutHandler = () => {
        dispatch(signout());
    }
    return (
        <div className={`sidebarContainer ${props.isOpen ? 'sidebarContainerOpen' : ''}`}>
            <div className="closeIcon" onClick={props.toggle}>
                <FaTimes />
            </div>
            <div className="sidebarMenu">
                <div className={`${props.currentActive==='home' ? 'activeSidebar' : ''} navItem`} onClick={props.toggle} >
                    <Link className="navLink" to="/">Home</Link>
                </div>

                <div className={`${props.currentActive==='realworld' ? 'activeSidebar' : ''} navItem`} onClick={props.toggle}>
                    <Link 
                        className="navLink" 
                        to={props.userInfo ? '/realworld' : '/signin?redirect=realworld'}
                    >
                        Real World
                    </Link>
                </div>

                <div className={`${props.currentActive==='roadmap' ? 'activeSidebar' : ''} navItem`} onClick={props.toggle}>
                    <Link 
                        className="navLink" 
                        to={props.userInfo ? '/roadmap' : '/signin?redirect=roadmap'}
                    >
                        Roadmap
                    </Link>
                </div>

                <div className={`${props.currentActive==='usefulresources' ? 'activeSidebar' : ''} navItem`} onClick={props.toggle}>
                    <Link 
                        className="navLink" 
                        to={props.userInfo ? '/usefulresources' : '/signin?redirect=usefulresources'}
                    >
                        Userful Resources
                    </Link>
                </div>
                
                <div className={`${props.currentActive==='signup' || props.currentActive==='user' ? 'activeSidebar' : ''} navItem`} onClick={props.toggle}>
                    <Link 
                        className="navLink" 
                        to={props.userInfo ? `/userprofile/${props.userInfo._id}` : '/signup'}
                    >
                        {props.userInfo ? props.userInfo.name : 'Sign Up'}
                    </Link>                
                </div>

            </div>  
            <div className="btnWrapper" onClick={props.toggle}>
                {
                    props.userInfo 
                        ? <Link className="sidebarBtn" to ="/#" onClick={signOutHandler}>Sign Out</Link>
                        : <Link className="sidebarBtn" to="/signin">Sign In</Link>
                }
            </div> 
        </div>
    )
}

export default Sidebar
