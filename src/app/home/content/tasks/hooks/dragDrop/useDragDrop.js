import { useGlobalContext } from '@/config/context/store';

import editTask from '@/utils/api/task/edit';

const useDragDrop = () => {
  
    const { userData, selectedProject, projects, setProjects } = useGlobalContext();
    const { type, id } = selectedProject;

    const ambient = userData.data.ambient;

    const handleDragEnd = async (drop) => {

        const tasks = projects[type][id].project_tasks;
        const { source, destination } = drop;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return;
        
        moveTask(tasks, source, destination);
    }

    const moveTask = (tasks, current, destination) => {

        if(type === 'todo') {

            const currentTask = tasks.find(task => task.task_order_key === current.index);
      
            if (currentTask) {
              const index = tasks.indexOf(currentTask);
              if (index !== -1) {
                tasks.splice(index, 1);
              }
          
              currentTask.task_order_key = destination.index;
              tasks.splice(destination.index, 0, currentTask);
          
              tasks.forEach((task, index) => {
                task.task_order_key = index;
              })
            }

        } else if(type === 'kanban') {

            const currentTask = tasks.find(task => task.task_order_key === current.index && task.task_column === parseInt(current.droppableId));
      
            if (currentTask) {
                
              const index = tasks.indexOf(currentTask);

              if (index !== -1) {
                tasks.splice(index, 1);
              }
          
              currentTask.task_order_key = destination.index;
              currentTask.task_column    = parseInt(destination.droppableId);

              tasks.splice(destination.index, 0, currentTask);
          
              tasks.forEach((task, index) => {
                task.task_order_key = index;
              })
            }
        }

        return tasks;
    }

    return { handleDragEnd };
}

export default useDragDrop;