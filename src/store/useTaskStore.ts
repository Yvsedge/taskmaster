import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  description : string;
}

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTasks: (task : {title : string, status : 'todo' | 'in_progress' | 'done', description : string}) => Promise<void>;
  deleteTasks: (id : number) => Promise<void>;
  updateTaskStatus : (id : number, newStatus : 'todo' | 'in_progress' | 'done') => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  
  tasks: [],
  fetchTasks: async () => {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });
    if (data) set({ tasks: data })},
  addTasks : async (task) => {
    const { data ,error } = await supabase
    .from('tasks')
    .insert(task)
    .select('*');

    if(data) set((state) => ({tasks : [...state.tasks, ...data] }));

    if(error){
      console.log("Data couldn't go through");
    }
  },
  deleteTasks : async (id) => {
    const {data, error} = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .select('*');

    if(data) set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) }));

    if(error){
      console.log(error);
    }
  },
  updateTaskStatus : async (id, newStatus) => {
      set((state) => ({
        tasks: state.tasks.map(t => 
          t.id === id ? { ...t, status: newStatus } : t
        )
      }));

      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error("Database sync failed:", error.message);

      }
  }
  }));
