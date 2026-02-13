import { useEffect, useState} from "react";
import { useTaskStore } from "../store/useTaskStore";
import Columns from "./Columns";
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/useAuthStore";
import {LogOut} from 'lucide-react';


export default function MainScreen(){
        console.log("--- MAIN SCREEN IS NOW RENDERING ---");
        const fetchTasks = useTaskStore(state => state.fetchTasks);
        const updateTaskStatus = useTaskStore(state => state.updateTaskStatus);
        const { signOut } = useAuthStore();
        const user = useAuthStore(state => state.user);

        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState(false);
    
        const handleAuth = async () => {
            setError(null);
            setLoading(true);
            
            try {
                await signOut();
            } catch (err: any) {
        alert(err.message); 
        setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        useEffect(() => {
        fetchTasks();

        const channelA = supabase
            .channel('schema-db-changes')
            .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'tasks'
            },
            (payload) => {
                console.log('REALTIME EVENT RECEIVED:', payload);
                fetchTasks();
            }
            )
            .subscribe(async (status, err) => {
            console.log("STATUS:", status);
            if (err) {
                console.error("REALTIME ERROR:", err.message);
            }
            
            if (status === 'SUBSCRIBED') {
                console.log("Successfully connected to the Cloud!");
            }
            });

            return () => {
                supabase.removeChannel(channelA);
            };
        }, []);

          const onDragEnd = (result: DropResult) => {
            const { draggableId, destination } = result;

            if (!destination) return;

            updateTaskStatus(Number(draggableId), destination.droppableId as any);
        };

    if(error) return <div className="text-red-600">{error}</div>
    if(loading) return <div className="text-yellow-600">{loading}</div>
    return(
        <div className="flex flex-col">
        <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 p-4 text-white font-mono">
            <h1 className="text-xl font-bold tracking-tighter text-blue-400">TaskMaster <span className="text-white">v1.0</span></h1>
            <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500 italic">{user?.email}</span>
                <button 
                    onClick={handleAuth}
                    className="border border-zinc-700 px-3 py-1 rounded hover:bg-red-500 hover:border-red-500 transition-all flex items-center gap-2 text-sm"
                >
                    <LogOut size={16} /> Sign Out
                </button>
            </div>
        </div>
            <DragDropContext onDragEnd={onDragEnd}>
            <div className="min-h-screen bg-black p-10 flex gap-8 justify-center overflow-x-auto">
                
                <Columns 
                    status="todo" 
                    />
                <Columns 
                    status="in_progress" 
                    />
                <Columns 
                    status="done" 
                    />
            </div>
            </DragDropContext>
        </div>
    )
}
