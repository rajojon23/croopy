import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Moment from 'moment';

import "../css/index.css";

const App = () => {

    const [commentList, setCommentList] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorEmail, setAuthorEmail] = useState("");

    
    const [reRender, setreRender] = useState(false);//will be the trigger that forces a re-render of the page when needed
    let commentBG = true;


    useEffect(() => {
    
    
    }, [reRender]);//to force re-render when required

    useEffect(() => {//this will be called every 2 seconds, to check if the database has been changed. Will allow the comments dashboard to be persisted no matter how many browser windows get open
        //I might have to use websockets instead in production (no time)  
        const interval = setInterval(() => {
         
            fetch('http://127.0.0.1:5000/test_comments')
            .then(response => response.json())
            .then((data) => {
                
                //data received from server BE
                const commentsData = data;
    
                //iterate through the data we got and push accordingly into commentList
                const tempCommentList = [];
                
                for (let index = 0; index < commentsData.length; index++) {
                    const comment = commentsData[index];

                    tempCommentList.push(comment);
                    
                    
                }

                if(tempCommentList.length != commentList.length){//goes inside if the comments need to be updated
                    setCommentList(tempCommentList);
                    setreRender(!reRender);//force re-render of the page (for instant update)
                };

                
    
                
            });


        }, 2000);
        return () => clearInterval(interval);
    }, []);

    

    
    //Function that adds a new comment
    const addComment = (comment) => {


        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }



        if(comment != ''){//make sure first the inputs aren't empty
            
            if(authorName != ''){

                if(authorEmail != '' && validateEmail(authorEmail)){//if it goes inside, everything is filled


                    let today = new Date().toISOString().slice(0, 10);//get the current date of today with the right format
                    

                    //everything is valid if we are here


                        
                    

                    //fetch to add the data needed (comment) to send to the BE
                    fetch('http://127.0.0.1:5000/api/v1/comments/add', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            comment: comment,
                            authorName: authorName,
                            authorEmail: authorEmail, 
                            date: today
                        })
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);

                        const commentsData = json;
                        const tempCommentList = [];
                        
                        for (let index = 0; index < commentsData.length; index++) {
                            const comment = commentsData[index];

                            tempCommentList.push(comment);
                            setCommentList(tempCommentList);
                            
                        }
                        
                        setreRender(!reRender);//re-render since we received something from the BE
                        
                        return json;
                    })



                }
                else{
                    alert('Invalid email');
                }
            }


        }

        

    };

    
    commentBG = !commentBG;

    return (
        <div className="container">
            <h2>Comments</h2>

            
                {commentList.map((comment) => (
                    
                    (comment[0] %2 === 0) ? //check if the comment's index position is odd or even , change background according to that 
                    
                    
                    
                        <div className="comment false"  >
                        

                            <div className= "commentLeft" >
                                    {/* Had to use Moment's utc method, otherwise will display the date with GMT, which is 1 day behind */}
                                    <div>{Moment.utc(comment[2]).format('DD MMM YYYY')}</div>

                                    <div>By <a className="linkMail" href={`mailto:${comment[4]}`}> {comment[1]}</a></div>
                            </div>
                            <div className="commentRight">
                                {comment[3]}
                            </div>

                        </div>

                    :  <div className="comment true"  >
                        

                        <div className= "commentLeft" >
                                <div>{Moment.utc(comment[2]).format('DD MMM YYYY')}</div>

                                <div>By <a className="linkMail" href={`mailto:${comment[4]}`}> {comment[1]}</a></div>
                        </div>
                        <div className="commentRight">
                            {comment[3]}
                        </div>

                        </div>

                ))}


            <h2>Leave a Comment</h2>
                    
                <div className="inputContainer">
                    <label>Your name *</label>
                    <input placeholder="John Smith"                         
                        onChange={(evt) => {
                            setAuthorName(evt.target.value);
                        
                            }
                        }
                    >

                    </input>
                </div>

                <form>
                    <div className="inputContainer">
                        <label for="email" id="email">Your email *</label>
                        <input placeholder="johnsmith@email.com" type="email" required
                        
                            onChange={(evt) => {
                                setAuthorEmail(evt.target.value);
                            
                                }
                            }                    
                        ></input>
                    </div>
                    <div className="inputContainer commentInput">
                        <label>Comment *</label>
                        <textarea  placeholder="Type your comment here"  rows="5"
                            onChange={(evt) => {
                                setNewComment(evt.target.value);
                            
                                }
                            }
                        
                        ></textarea >
                    </div>
                    <a onClick={
                                (event) => {
                                    addComment(newComment);
                                }


                    } id="submit">Submit Comment</a>
                </form>
        </div>
    )
  
}



export default App;