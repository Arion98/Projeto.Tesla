import React, {useState, useEffect} from "react";
import TaskService from "../../service/task-service";

const TaskForm = (props) => {
    const [task, setTask] = useState({});
    const {id, onSave} = props;

    useEffect(() => {
        if(!id) return;
        const load = async() => {
            const task = await TaskService.getTask(id);
            setTask(task);
        };
        load();
    },[id]);

    const handleChange = (e) => {
        setTask({
            ...task,
            description:e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.id){
            TaskService.updateTask(props.id, task)
            .then(()=>{
                props.onSave();
            })
            .catch((error)=>{
                console.log(error);
            });
        }else{
            TaskService.createTask(task)
            .then(()=>{
                props.onSave();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" 
                name="description"
                placeholder="Task description"
                onChange={handleChange}
                value={task.description ? task.description:""} />
            <button type="submit">Save</button>
        </form>
    );
};

export default TaskForm;