import React, {useState} from 'react'

function ToDoList(){

    const[task,setTask] = useState(["Take a shower", "Eat breakfast", "Do cp"]);
    const[newTask,setNewTask] = useState("");

    function handleInput(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim()!==""){
            setTask(t => [...t,newTask]);
             setNewTask("");
        }
    }
    function deleteTask(index){
        const updated=task.filter((_,i) => i!==index);
        setTask(updated);
    }
    function moveup(index){
        if(index>0){
            const updated=[...task];
            [updated[index],updated[index-1]]=[updated[index-1],updated[index]];
            setTask(updated);
        }
    }
    function movedown(index){
        if(index<task.length-1){
            const updated=[...task];
            [updated[index],updated[index+1]]=[updated[index+1],updated[index]];
            setTask(updated);
        }
    }
    return(
        <div className="todo">

            <h1>TO-DO LIST</h1>
           <div><input type="text"
                placeholder="Enter a task.."
                value={newTask}
                onChange={handleInput}></input>
            <button className="add-btn" onClick={addTask}>Add</button></div> 
            <div>
            <ol>
                {task.map((task,index)=>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="del-btn"
                    onClick={()=>{deleteTask(index)}}>Delete task</button>
                    <button className="move-btn"
                    onClick={()=>{moveup(index)}}>Up</button>
                    <button className="move-btn"
                    onClick={()=>{movedown(index)}}>Down</button>
                </li>)}
            </ol>
            </div>
        </div>
    )
}

export default ToDoList