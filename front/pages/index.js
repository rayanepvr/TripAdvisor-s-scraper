import Head from '../components/head'
import '../styles/index.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';


function Home() {

    /* Input of the user */
    const [state, setState] = useState('');
    /* Flag if the link is incorrect set to false */
    const [error, setError] = useState(true);
    const [StarsAverage, setStarsAverage] = useState(0);
    const [Words, setWords] = useState(0);
    const [query, setQuery] = useState('');
    const [oneStar, setOne] = useState(0);
    const [twoStar, setTwoStar] = useState(0);
    const [threeStar, setThreeStar] = useState(0);
    const [fourStar, setFourStar] = useState(0);
    const [fiveStar, setFiveStar] = useState(0);

    /* Call the backend server and wait for the answer to parse it
    * If there is no answer it does nothing
    * If there is an error it throws it
    * */

    async function fetchStats(url) {
        console.log(url);
        if (url !== '') {
            try {
                setError(true);
                await Axios(url).then((response) => {
                    /* If the server couldn't parse the link we skip it and notify the user */
                    if(response.data['Average'] === '-1'){
                        setError(false);
                        return;
                    }
                    setStarsAverage(response.data['Average']);
                    setWords(response.data['Rating']);
                    setOne(response.data['One']);
                    setTwoStar(response.data['Two']);
                    setThreeStar(response.data['Three']);
                    setFourStar(response.data['Four']);
                    setFiveStar(response.data['Five']);

                    let sum = parseInt(response.data['One']) + parseInt(response.data['Two']) + parseInt(response.data['Three']) + parseInt(response.data['Four']) + parseInt(response.data['Five']);
                    if (sum === 0) {
                        throw new Error("Star's sum equal 0");
                    }
                    document.documentElement.style.setProperty('--bar-size1', parseInt(response.data['One']) / sum * 100 + "%");
                    document.documentElement.style.setProperty('--bar-size2', parseInt(response.data['Two']) / sum * 100 + "%");
                    document.documentElement.style.setProperty('--bar-size3', parseInt(response.data['Three']) / sum * 100 + "%");
                    document.documentElement.style.setProperty('--bar-size4', parseInt(response.data['Four']) / sum * 100 + "%");
                    document.documentElement.style.setProperty('--bar-size5', parseInt(response.data['Five']) / sum * 100 + "%");

                });


            } catch (err) {
                setError(false);
                if (err) {
                    console.log(err);

                }

            }
        }

    }

    useEffect(() => {
        fetchStats(query);
    }, [query]);


    return (
        <div id="home">
            <Head title="Home"/>

            <div hidden={error} id="error" className="alert alert-danger col-sm-5" role="alert">
                The link is incorrect !
            </div>
            <div id="link" className="input-group col-sm-5">

                <div className="input-group-prepend">

                    <span className="input-group-text">Enter the TripAdvisor link</span>
                </div>
                <input onChange={input => setState(input.target.value)} type="text" className="form-control"
                       id="basic-url" aria-describedby="basic-addon3"/>
            </div>
            <br></br>
            <button id="sendButton" onClick={() => setQuery('http://localhost:8083/' + state)} type="button"
                    className="btn btn-primary">Check the
                stats
            </button>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <div className="well well-sm">
                        <div className="rating-block">
                            <div className="col-xs-12 col-md-6 text-center">
                                <h1 className="rating-num">
                                    {StarsAverage} / 5</h1>
                                <div className="rating">

                                </div>
                                <div>
                                    <i className="far fa-comments"></i> {Words} words
                                </div>
                            </div>
                            <div>
                                <div className="row rating-desc">
                                    <div className="col-xs-3 col-md-3 text-right">
                                        5 <i className="fas fa-star"/>
                                    </div>
                                    <div className="col-xs-8 col-md-9">
                                        <div className="progress progress-striped">
                                            <div id="five" className="progress-bar progress-bar-success"
                                                 role="progressbar"
                                                 aria-valuenow="20"
                                                 aria-valuemin="0" aria-valuemax="100">
                                                <div className="pull-right">{fiveStar}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-3 col-md-3 text-right">
                                        4 <i className="fas fa-star"/>
                                    </div>
                                    <div className="col-xs-8 col-md-9">
                                        <div className="progress">
                                            <div id="four" className="progress-bar progress-bar-success"
                                                 role="progressbar"
                                                 aria-valuenow="20"
                                                 aria-valuemin="0" aria-valuemax="100">
                                                <div className="pull-right">{fourStar}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-3 col-md-3 text-right">
                                        3 <i className="fas fa-star"/>
                                    </div>
                                    <div className="col-xs-8 col-md-9">
                                        <div className="progress">
                                            <div id="three" className="progress-bar progress-bar-info"
                                                 role="progressbar"
                                                 aria-valuenow="20"
                                                 aria-valuemin="0" aria-valuemax="100">
                                                <div className="pull-right">{threeStar}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-3 col-md-3 text-right">
                                        2 <i className="fas fa-star"/>
                                    </div>
                                    <div className="col-xs-8 col-md-9">
                                        <div className="progress">
                                            <div id="two" className="progress-bar progress-bar-warning"
                                                 role="progressbar"
                                                 aria-valuenow="20"
                                                 aria-valuemin="0" aria-valuemax="100">
                                                <div className="pull-right">{twoStar}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-3 col-md-3 text-right">
                                        1 <i className="fas fa-star"/>
                                    </div>
                                    <div className="col-xs-8 col-md-9">
                                        <div className="progress">
                                            <div id="one" className="progress-bar progress-bar-danger"
                                                 role="progressbar"
                                                 aria-valuenow="80"
                                                 aria-valuemin="0" aria-valuemax="100">
                                                <div className="pull-right">{oneStar}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`


                  #link{
                    margin-top:10%;
                    margin-left:30%;
                  }
                  #error{
                    margin-top:-5%;
                    margin-left:30%;
    position: absolute;
                  }
                  #sendButton{
                    margin-left:45%;


                  }
                  .fa-star{
                    color : #ffff66;




                  }

                 .row{

                     margin-left:35%;

                 }
                 .rating-block{
                    margin-top:2%;
                    border-left:15%;
                    background-color:#FAFAFA;
                    border:1px solid #EFEFEF;
                    border-radius:3px;

                 }

                .rating {font-size: 22px;}
                .rating-num { margin-top:0px;font-size: 54px; }
                .progress { margin-bottom: 5px;}
                .progress-bar { text-align: left; }
                .rating-desc .col-md-3 {padding-right: 0px;}
                .sr-only { margin-left: 5px;overflow: visible;clip: auto; }
                `}</style>
            <style global jsx>{`
                    body {
                      background: url('static/background.jpg') no-repeat;
                        -webkit-background-size: cover;
                          -moz-background-size: cover;
                          -o-background-size: cover;
                          background-size: cover;
                    }
                  `}</style>
        </div>
    );


}


export default Home;
