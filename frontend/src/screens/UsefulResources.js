import React, {useEffect, useState} from 'react'; 
import { decode, loadStegoImage } from '../steganography';
import {animateScroll as scroll} from 'react-scroll';
import ReactLoading from 'react-loading';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveImage } from '../actions/imageActions';
import { IMAGE_RETRIEVE_CLEAR } from '../constants/imageConstants';
import { isAuthorizedUser } from '../actions/userActions';
import { AUTHORIZE_FAIL } from '../constants/userConstants';
import { Link } from 'react-router-dom';
import YoutubeEmbed from '../components/YoutubeEmbed/YoutubeEmbed';

function UsefulResources(props) {
    const [stegoImageID, setStegoImageID] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [isDecoded, setIsDecoded] = useState('');
    const [decodedMessage, setDecodedMessage] = useState('');
    const [error, setError] = useState(false);
    const [selectedImageURL, setSelectedImageURL] = useState("/images/blankimage.jpg");
    const [isAuthorizedLoading, setIsAuthorizedLoading] = useState(true);

    const dispatch = useDispatch();

    const retrieveImageState = useSelector(state => state.retrieveImage);
    const { stegoImage, retrieveImageLoading = retrieveImageState.loading } = retrieveImageState;
    
    stegoImage && stegoImage.stegoImageURL && selectedImageURL!==stegoImage.stegoImageURL && setSelectedImageURL(stegoImage.stegoImageURL) 
    error && selectedImageURL!=="/images/blankimage.jpg" && setSelectedImageURL("/images/blankimage.jpg")

    const isAuthorized = useSelector(state => state.isAuthorized); 
    const {type, authorizedUserInfo} = isAuthorized;

    const submitHandler = (e) => {
        e.preventDefault();
        if(selectedImageURL!=="/images/blankimage.jpg"){
            setError(false);
            decode(setIsDecoded, setDecodedMessage, secretKey, isAuthorized.authorizedUserInfo._id);
        } else {
            setError(true);
        }
        
    }
    useEffect(() => {
        dispatch(isAuthorizedUser(setIsAuthorizedLoading));
        setIsDecoded('');
        dispatch({type:IMAGE_RETRIEVE_CLEAR});
        props.setHeaderBg(true);
        props.setCurrentActive('usefulresources');
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
                :(
                    <div className="decodingContainer">
                        <div className="gridTopParagraphWrapper">
                            <p className="gridTopParagraph">{props.data.usefulResourcesContent}</p>
                        </div>

                        <div className="gridContainer">
                            <div className="gridWrapper gridWrapperDecode">
                                <div className="column1 column1EncodeDecode">
                                    <form className="formContent" onSubmit={submitHandler}>
                                        <p className="gridTopLine">Useful Resources</p>
                                        <h1 className="gridColumnHeading">Web Learn - Useful Resources</h1>

                                        <label htmlFor="stegoImageId">Reference Books </label>
                                        
                                        
                                        <div className="card">
                                            <div className="flex-child">
                                                <Link to={{pathname: "https://www.amazon.in/HTML-CSS-Design-Build-Websites/dp/1118008189"}} target="_blank" >
                                                    <img className="small" src="https://images-na.ssl-images-amazon.com/images/I/81aZlKYjIBL.jpg" alt="product"/>
                                                </Link>
                                            </div>
                                            
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.amazon.in/HTML-CSS-Design-Build-Websites/dp/1118008189"}} target="_blank" >
                                                    <h2>HTML & CSS: Design and Build Web Sites</h2>
                                                </Link>
                                                <br></br>
                                                <Link className='link pdflink' to={{pathname: "https://www.pdfdrive.com/download.pdf?id=9599066&h=f2f231b39e648d7db773fe8c02e87132&u=cache&ext=pdf"}} target="_blank" >
                                                    <h2>PDF Download</h2>
                                                </Link>
                                                
                                            </div>
                                        </div>   

                                        
                                        <div className="card">
                                            <div className="flex-child">
                                                <Link  to={{pathname: "https://www.amazon.in/JavaScript-JQuery-Interactive-Front-End-Development/dp/1118531647"}} target="_blank" >
                                                    <img className="small" src="https://images-na.ssl-images-amazon.com/images/I/71viHxTLKgL.jpg" alt="product"/>
                                                </Link>
                                                
                                            </div>
                                            
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.amazon.in/JavaScript-JQuery-Interactive-Front-End-Development/dp/1118531647"}} target="_blank" >
                                                    <h2>JavaScript and JQuery: Interactive Front-End Web Development</h2>
                                                </Link>
                                                <br></br>
                                                <Link className='link pdflink' to={{pathname: "https://www.pdfdrive.com/download.pdf?id=195248768&h=5317c882f2047cc8fb3ca83e74b2fd3c&u=cache&ext=pdf"}} target="_blank" >
                                                    <h2>PDF Download</h2>
                                                </Link>
                                            </div>
                                        </div>   
                                                            
                                        <div className="card">
                                            <div className="flex-child">
                                                <Link  to={{pathname: "https://www.amazon.in/dp/1839211563/ref=cm_sw_r_apa_i_J21MFAE2RN7T5KGA25T9_0"}} target="_blank" >
                                                    <img className="small" src="https://images-eu.ssl-images-amazon.com/images/I/51HltaSN6KL._SY445_SX342_QL70_ML2_.jpg" alt="product"/>
                                                </Link>
                                            </div>
                                            
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.amazon.in/dp/1839211563/ref=cm_sw_r_apa_i_J21MFAE2RN7T5KGA25T9_0"}} target="_blank" >
                                                    <h2>Responsive Web Design with HTML5 and CSS</h2>
                                                </Link>
                                                <br></br>
                                                <Link className='link pdflink' to={{pathname: "https://org2.knuba.edu.ua/mod/resource/view.php?id=19973"}} target="_blank" >
                                                    <h2>PDF Download</h2>
                                                </Link>
                                            </div>
                                        </div> 

                                        <div className="card">
                                            <div className="flex-child">
                                                <Link  to={{pathname: "https://www.amazon.in/Fundamentals-Web-Development-Randy-Connolly/dp/9332575274"}} target="_blank" >
                                                    <img className="small" src="https://images-na.ssl-images-amazon.com/images/I/5151y7izIkL.jpg" alt="product"/>
                                                </Link>
                                            </div>
                                            
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.amazon.in/Fundamentals-Web-Development-Randy-Connolly/dp/9332575274"}} target="_blank" >
                                                    <h2>Fundamentals of Web Development</h2>
                                                </Link>
                                                <br></br>
                                                <Link className='link pdflink' to={{pathname: "http://www.gbv.de/dms/tib-ub-hannover/814195423.pdf"}} target="_blank" >
                                                    <h2>PDF Download</h2>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="flex-child">
                                                <Link  to={{pathname: "https://www.amazon.in/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J/ref=d_pd_sbs_sccl_1_1/257-0620781-3118043?pd_rd_w=Te064&content-id=amzn1.sym.2db7fcb9-4c68-4d7a-84ce-450f877f4572&pf_rd_p=2db7fcb9-4c68-4d7a-84ce-450f877f4572&pf_rd_r=PB8F443EX88FDD69KK0R&pd_rd_wg=TlBRy&pd_rd_r=43fbc181-99e7-4ebf-8e4a-4f02f01574ba&pd_rd_i=B0979MGJ5J&psc=1"}} target="_blank" >
                                                    <img className="small" src="https://m.media-amazon.com/images/I/418nSN91rmS._SL500_.jpg" alt="product"/>
                                                </Link>
                                            </div>
                                            
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.amazon.in/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J/ref=d_pd_sbs_sccl_1_1/257-0620781-3118043?pd_rd_w=Te064&content-id=amzn1.sym.2db7fcb9-4c68-4d7a-84ce-450f877f4572&pf_rd_p=2db7fcb9-4c68-4d7a-84ce-450f877f4572&pf_rd_r=PB8F443EX88FDD69KK0R&pd_rd_wg=TlBRy&pd_rd_r=43fbc181-99e7-4ebf-8e4a-4f02f01574ba&pd_rd_i=B0979MGJ5J&psc=1"}} target="_blank" >
                                                    <h2>Beginning MERN Stack Development</h2>
                                                </Link>
                                            </div>
                                        </div>  
                                        

                                        <div className="card">
                                            <div className="flex-child">
                                                <Link  to={{pathname: "https://www.amazon.in/Web-Technology-Fundamentals-Dr-Saranya/dp/164828664X"}} target="_blank" >
                                                    <img className="small" src="https://images-na.ssl-images-amazon.com/images/I/51Un57OmVYL._SX331_BO1,204,203,200_.jpg" alt="product"/>
                                                </Link>
                                            </div>
                                            
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.amazon.in/Web-Technology-Fundamentals-Dr-Saranya/dp/164828664X"}} target="_blank" >
                                                    <h2>Web Technology: Fundamentals of Programming</h2>
                                                </Link>
                                            </div>
                                        </div> 
                                    </form>
                                    <br></br>
                                    <form className="formContent" onSubmit={submitHandler}>
                                        <h1 className="gridColumnHeading">Web Learn - Instagram Pages</h1>

                                        <label htmlFor="stegoImageId">Instagram References </label>
                                        
                                        
                                        <div className="card">
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.instagram.com/richwebdeveloper/?hl=en"}} target="_blank" >
                                                    <h2>@richwebdeveloper</h2>
                                                </Link>                                                
                                            </div>
                                        </div>   

                                        <div className="card">
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.instagram.com/webdevelopment24x7/?hl=en"}} target="_blank" >
                                                    <h2>@webdevelopment24x7</h2>
                                                </Link>                                                
                                            </div>
                                        </div> 
                                        
                                        <div className="card">
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.instagram.com/lubnadev/?hl=en"}} target="_blank" >
                                                    <h2>@lubnadev</h2>
                                                </Link>                                                
                                            </div>
                                        </div> 
                                        <div className="card">
                                            <div className="card-body flex-child">
                                                <Link className='link' to={{pathname: "https://www.instagram.com/developers_community_._/?hl=en"}} target="_blank" >
                                                    <h2>@developers_community_</h2>
                                                </Link>                                                
                                            </div>
                                        </div> 

                                    </form>

                                </div>
                                <div className="column2 column2EncodeDecode">
                                    <form className="formContent" onSubmit={submitHandler}>
                                        <p className="gridTopLine">Useful Resources</p>
                                        <h1 className="gridColumnHeading">Web Learn - Best Youtube References</h1>

                                        <label htmlFor="stegoImageId">Reference Videos </label>
                                        <YoutubeEmbed embedId="RsQ1tFLwldY" />
                                        <YoutubeEmbed embedId="XGa4onZP66Q" />
                                        <YoutubeEmbed embedId='3l13qGLTgNw' />
                                        <YoutubeEmbed embedId="Q33KBiDriJY" />
                                        <YoutubeEmbed embedId="85tq0LjYATk" />
                                        
                                      
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

export default UsefulResources
