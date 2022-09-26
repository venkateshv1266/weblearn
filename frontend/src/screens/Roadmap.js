import React, {useState, useEffect} from 'react';
import { loadPlainImage, encode } from '../steganography';
import {animateScroll as scroll} from 'react-scroll';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../actions/imageActions';
import ReactLoading from 'react-loading';
import { IMAGE_UPLOAD_CLEAR } from '../constants/imageConstants';
import { EMAIL_SEND_CLEAR } from '../constants/sendEmailConstants';
import { AUTHORIZE_FAIL } from '../constants/userConstants';
import { isAuthorizedUser } from '../actions/userActions';

function Roadmap(props) { 
    const [message, setMessage] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [isEncoded, setIsEncoded] = useState('');
    const [selectedImageURL, setSelectedImageURL] = useState("/images/blankimage.jpg");
    const [error, setError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isAuthorizedLoading, setIsAuthorizedLoading] = useState(true);

    const dispatch = useDispatch();
    const uploadImageState = useSelector(state => state.uploadImage);
    const {stegoImage, uploadImageError = uploadImageState.error, uploadImageLoading = uploadImageState.loading} = uploadImageState;

    const sendEmailState = useSelector(state => state.sendEmail);
    const {sendEmailResponse, sendEmailError = sendEmailState.error, sendEmailLoading = sendEmailState.loading} = sendEmailState;

    const isAuthorized = useSelector(state => state.isAuthorized); 
    const {type, authorizedUserInfo} = isAuthorized;

    const submitHandler = async (e) => {
        e.preventDefault();
        if(selectedImageURL === "/images/blankimage.jpg"){
            setImageError(true);
            return;
        }
        if(!recipientEmail){
            dispatch({type:EMAIL_SEND_CLEAR});
        }
        if(message && secretKey){
            setError(false);
            setImageError(false);
            const stegoImageURL = await encode(message, secretKey, setIsEncoded, isAuthorized.authorizedUserInfo._id);
            dispatch(uploadImage(stegoImageURL, recipientEmail, secretKey));
        } else {
            setError(true);
        }
    }

    useEffect(() => {
        dispatch(isAuthorizedUser(setIsAuthorizedLoading));
        dispatch({type:IMAGE_UPLOAD_CLEAR});
        dispatch({type:EMAIL_SEND_CLEAR});
        props.setHeaderBg(true);
        props.setCurrentActive('roadmap');
        scroll.scrollToTop();
    },[props.headerBg, props.currentActive]);

    return (
        <div>
            {
                isAuthorizedLoading ?
                (
                    <div className="loadingWrapper">
                        <ReactLoading type='bars' color={'#01193d'} height={'30%'} width={'30%'} />
                    </div>
                )
                : type===AUTHORIZE_FAIL ? 
                (
                    <div>
                        {props.history.push('/signin')}
                    </div>
                )
                : !authorizedUserInfo.isVerified ? 
                (
                    <div className="verifyEmailContainer">
                        <div className="importantMark">
                            !
                        </div>
                        <span>Please verify your email from user profile screen.</span>
                    </div>
                )
                :
                (
                    <div className="encodingContainer">
                        <div className="gridTopParagraphWrapper">
                            <p className="gridTopParagraph">{props.data.roadmapContent}</p>
                        </div>

                        <div className="gridContainer">
                            <div className="gridWrapper ">
                                <div className="column1 column1EncodeDecode">
                                    <form className="formContent" onSubmit={submitHandler}>
                                        <p className="gridTopLine">Roadmap</p>
                                        <h1 className="gridColumnHeading">Web Learn - Java Backend Roadmap</h1>

                                        <div className="listcontainer">
                                            <ul>
                                                <li><p>HTML5 - Structuring The Webpage</p></li>
                                                <li><p>CSS3 - Styling The Webpage</p></li>
                                                <li><p>Tailwind - A CSS Framework</p></li>
                                                <li><p>Bootstrap - Frontend Framework</p></li>
                                                <li><p>Javascript - Programming Language</p></li>
                                                <li><p>MVC - Model View Controller</p></li>
                                                <li><p>Java - Programming Language</p></li>
                                                <li><p>Java Servlets and JSP</p></li>
                                                <li><p>Apache Tomcat Server</p></li>
                                                <li><p>Spring Boot - Backend Framework </p></li>
                                                <li><p>MySQL - Database</p></li>
                                                <li><p>JDBC - Java Database Connection</p></li>
                                                <li><p>Deployment - Hosting The Website</p></li>
                                                <li><p>Heroku - Free Web Hosting Platform</p></li>
                                            </ul>
                                        </div>
                                       
                                    </form>
                                    
                                </div>
                                <div className="column2 column2EncodeDecode">
                                    <form className="formContent" onSubmit={submitHandler}>
                                        <p className="gridTopLine">Roadmap</p>
                                        <h1 className="gridColumnHeading">Web Learn - NodeJS Backend Roadmap</h1>
                                        
                                        <div className="listcontainer">
                                            <ul>
                                                <li><p>HTML5 - Structuring The Webpage</p></li>
                                                <li><p>CSS3 - Styling The Webpage</p></li>
                                                <li><p>Tailwind - A CSS Framework</p></li>
                                                <li><p>Bootstrap - Frontend Framework</p></li>
                                                <li><p>Javascript - Programming Language</p></li>
                                                <li><p>JS ES6 Features</p></li>
                                                <li><p>ReactJS - Frontend JS UI Library</p></li>
                                                <li><p>Typescipt - Prerequisite for Angular</p></li>
                                                <li><p>AngularJS - Frontend Framerork</p></li>
                                                <li><p>NodeJS - A Runtime Environment</p></li>
                                                <li><p>Express JS - Backend Framework </p></li>
                                                <li><p>Mongo DB - NoSQL Database</p></li>
                                                <li><p>Deployment - Hosting The Website</p></li>
                                                <li><p>Heroku - Free Web Hosting Platform</p></li>
                                            </ul>
                                        </div>
                                       
                                    </form>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
        
    )
}

export default Roadmap
