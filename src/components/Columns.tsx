import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";

import {Plus, X, ChevronRight, ChevronLeft} from 'lucide-react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface ColumnsProps{
    status: 'todo' | 'in_progress' | 'done';
}

const typeColors: Record<string, string> = {
    'todo' : "#05A8D9",
    'in_progress' : "#19A648",
    'done' : "#FCD021",
};


export default function Columns({status} : ColumnsProps){

    const [flag, setFlag] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const addTasks = useTaskStore(state => state.addTasks);
    const delTask = useTaskStore(state => state.deleteTasks);
    const updateTask = useTaskStore(state => state.updateTaskStatus);

    function update(id : number ,dir : string){
        if(dir == "r" && status == 'todo'){
            updateTask(id, 'in_progress');
        }
        else if(dir == 'l' && status == 'done'){
            updateTask(id, 'in_progress');
        }
        else if(dir == 'r' && status == 'in_progress'){
            updateTask(id, 'done');
        }
        else if(dir =='l' && status == 'in_progress'){
            updateTask(id, 'todo');
        }
    }

    

    const insertObj = () => {
        addTasks({title : name, status : status ,description : desc})
        setDesc("");
        setName("");
    }

    const tasks = useTaskStore(state => state.tasks);
    const myTasks = tasks.filter(t => t.status == status);
    const currStatus = () => {
        if(status == 'todo'){
            return "To Do";
        }
        else if(status == 'done'){
            return "Done";
        }
        else{
            return "In Progress";
        }
    }
    const color = typeColors[status] || "#ffffff";

    return(
        <div className="text-black w-full bg-zinc-300 flex flex-col  justify-between font-mono">
            <div>
                <h1 
                    className="pt-5 mb-5 pl-5 font-bold text-2xl pb-5"
                    style={{background: `linear-gradient(90deg, ${color} 0%, ${color}bb 100%)`}}>
                        {currStatus()} 
                </h1>

                <Droppable droppableId={status}>

                     {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>

                            {myTasks.length === 0 && <p className="text-zinc-400 m-5"> Nothing To Show.... </p>}

                        
                            {myTasks.map((t, index) => 
                            <Draggable key={t.id} draggableId={t.id.toString()} index={index}>
                                {(provided) => 
                                    <div
                                    ref={provided.innerRef} 
                                    {...provided.draggableProps} 
                                    {...provided.dragHandleProps}
                                    className="bg-white m-5 flex gap-4 p-2 pt-4 flex-col min-h-32 shadow-sm shadow-black group">
                                        <div className="flex justify-between ">
                                            <p 
                                                className="border border-black w-5/13 p-2 rounded-xl shadow-sm shadow-black"
                                                style={{background: `linear-gradient(90deg, ${color} 0%, ${color}bb 100%)`}}
                                            > {t.title} </p>
                                            <button 
                                                className="text-red-500 hidden group-hover:block"
                                                onClick={() => {
                                                    delTask(t.id);
                                                }}
                                                > <X/> 
                                            </button>
                                        </div>
                                        <p className="text-zinc-500"> {t.description} </p>
                                        <div className="flex justify-between">
                                            {status != 'todo' && <button onClick={() => update(t.id ,"l")} value={"l"}> <ChevronLeft></ChevronLeft> </button>}
                                            {status != 'done' && <button onClick={() => update(t.id , "r")} value={"r"}> <ChevronRight></ChevronRight> </button>}
                                        </div>
                                    </div>
                                }
                            </Draggable>)}
                        {provided.placeholder}  
                        </div>)}

                </Droppable>
            </div>
            <div>
                {!flag 
                ? 
                    <div className="flex justify-center">
                        <button 
                            onClick={() => setFlag(!flag)}
                            className="flex text-zinc-800 m-5 justify-center p-2 rounded-xl w-full hover:bg-white hover:text-black focus:border focus:border-amber-300"
                            > <Plus/> Add another card 
                        </button> 
                    </div>
                :
                    <div className="flex gap-2 flex-col items-center m-5">
                        <input 
                            type="text" 
                            name="title" 
                            id="title" 
                            placeholder="Title"
                            className="border border-black bg-white w-6/12"
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        <input 
                            type="text"
                            name="description"
                            id="description" 
                            placeholder="This is to be done"
                            className="border border-black bg-white w-6/12"
                            value={desc}
                            onChange={(e) => {setDesc(e.target.value)}}
                        />
                        <input 
                            type="button"
                            value="Submit"
                            disabled = {name == ""}
                            className="border border-black bg-white w-6/12 rounded-xl disabled:text-zinc-300 disabled:border-zinc-500"
                            onClick={() => {
                                setFlag(!flag);
                                insertObj();
                            }}
                        />
                    </div>
                }                
            </div>
        </div>
    )
}
