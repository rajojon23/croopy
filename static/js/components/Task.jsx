import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../css/task.css";

const Task = ({task, taskList, setTaskList }) =>{


    //Task component will receive Task List here 
    let taskListTemp = taskList;


    const removeTask = (taskToRemove) => {
        
        //find the task from the task list and remove it (by using th efilter method)
        taskListTemp = taskListTemp.filter(task => task !== taskToRemove);

        setTaskList(taskListTemp);

        

        fetch('http://127.0.0.1:5000/api/v1/tasklist/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: taskToRemove
            })
          })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            return json;
           })
        
    }


    return(
        <div className="taskContainer">
            <li 
                onClick={(event) => {
                    event.target.style.textDecoration = "line-through";
                    event.target.style.color = "gray";

                }}            
            
            >{task} </li>
            <button
                onClick={(event) => {
                    removeTask(task);

                }}           
            
            >Remove</button>
        </div>

    );
}

export default Task;