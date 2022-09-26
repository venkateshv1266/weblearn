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

function RealWorld(props) { 
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
        props.setCurrentActive('realworld');
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
                            <p className="gridTopParagraph">{props.data.realWorldContent}</p>
                           
                        </div>

                        <div className="realworldContainer">
                            <div className='realworldHeading'>
                                <p className="gridTopLine">Real World</p>
                                <h1 className="gridColumnHeading">Web Learn - Working Of Website</h1>
                            </div>
                            <div className='realworldWrapper'>
                                <div className="imageWrap realworldImageWrap">
                                    <img src="images/webworking.png" alt="" /> 
                                </div>
                                <div className="realworldListContainer imageWrap">
                                    <ul>
                                        <li><p>User enters the URL in the search bar.</p></li>
                                        <li><p>Browser sends the request to DNS server for its equivalent IP address.</p></li>
                                        <li><p>DNS Server give the response to browser containing the IP address</p></li>
                                        <li><p>Browser sends a HTTP Request to fetch the web information from the web server</p></li>
                                        <li><p>Once the server gets its request, it sends HTTP Response to the requested browser</p></li>
                                        <li><p>The response is in the form of HTML file, CSS file, etc.</p></li>
                                        <li><p>Finally, the browser interprets the file and shows the website as it supposed to display.</p></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>

                        <div className="realworldContainer">
                            <div className='realworldHeading'>
                                <p className="gridTopLine">Real World</p>
                                <h1 className="gridColumnHeading">Web Learn - Working Of API</h1>
                            </div>
                            <div className='realworldWrapper apiWrapper'>
    
                                <div className="imageWrap ">
                                    <img src="images/apiworking.png" alt="" /> 
                                </div>
                                <div className="realworldListContainer imageWrap apiListContainer">
                                    <ul>
                                        <h3>Working</h3>
                                        <li><p>API is essentially a set of rules that dictate how two machines talk to each other.</p></li>
                                        <li><p>The typical user interface is intended for use by a human being, while APIs are intended for use by an application or computer.</p></li>
                                        <li><p>User initiates an API call that tells the application to do something</p></li>
                                        <li><p>The application will use an API to ask the web server to do something.</p></li>
                                        <li><p>The API is the middleman between the application and the web server, and the API call is the request.</p></li>
                                        <br></br>
                                        <h3>Abstraction - Restaurant</h3>
                                        <li><p>Imagine you’re a customer at a restaurant.</p></li>

                                        <li><p>The waiter (the API) functions as an intermediary between customers like you (the user) and the kitchen (web server).</p></li>
                                        <li><p>You tell the waiter your order (API call), and the waiter requests it from the kitchen.</p></li>
                                        <li><p>Finally, the waiter will provide you with what you ordered.</p></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>

                        <div className="realworldContainer">
                            <div className='realworldHeading'>
                                <p className="gridTopLine">Real World</p>
                                <h1 className="gridColumnHeading">Web Learn - Working Of AJAX</h1>
                            </div>
                            <div className="imageWrap ">
                                    <img src="images/ajaxworking.jpg" alt="" /> 
                            </div>
                            <h1 className="gridColumnHeading">An Example</h1>
                            <div className='realworldWrapper'>
                                <div className="imageWrap realworldImageWrap">
                                
                                    <img src="images/ajaxexample.jpg" alt="" /> 
                                </div>
                                <div className="realworldListContainer imageWrap">
                                    <ul>
                                        <h3>Working</h3>
                                        <li><p>AJAX is used to update a web page without reloading the page.</p></li>
                                        <li><p>Once the page is loaded, an XMLHttpRequest object is created by JavaScript.</p></li>
                                        <li><p>This object sends a request to a web server.</p></li>
                                        <li><p>The server processes the request and sends a response back to the web page. </p></li>
                                        <li><p>The response is read by JavaScript and proper action is performed.</p></li>
                                        <h3>Example</h3>
                                        <li><p>User enters the data in the google search box. </p></li>
                                        <li><p>The data from the server is fetched and displayed as suggestions without reloading the web page.</p></li>
                                        <li><p>This is an example of AJAX call.</p></li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                )
            }
            
        </div>
        
    )
}

export default RealWorld
