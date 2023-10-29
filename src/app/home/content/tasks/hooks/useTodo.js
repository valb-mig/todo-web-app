import { useGlobalContext } from '@/config/context/store';

import taskAdd    from '@/utils/validators/home/task/addController';
import taskEdit   from '@/utils/validators/home/task/editController';
import taskRemove from '@/utils/validators/home/task/removeController';

import cleanObject from '@/utils/helpers/cleanObject';

const useTodo = () => {
   
    const { projects, selectedProject, userData, setProjects } = useGlobalContext();
    const ambient = userData.data.ambient;

    const submitTask = async (event, taskFormData, setTaskFormData) => {

        event.preventDefault();

        let response = await taskAdd(selectedProject, taskFormData, projects, ambient);

        if(typeof response == "object") {

            setProjects(response);      
            setTaskFormData(cleanObject(taskFormData));

        } else if(typeof response == "boolean") {
            setTaskFormData({...taskFormData, error: true});
        }
    } 

    const handleEditTask = async (task_id, task_key, edit) => {

        let response = await taskEdit(selectedProject, projects, task_id, task_key, edit, ambient);
        
        if(typeof response == 'object') {

            setProjects(response);
        }
    }

    const handleRemoveTask = async (task_id, task_key) => {

        let response = await taskRemove(selectedProject, projects, task_id, task_key, ambient);
        
        if(typeof response == 'object') {
            setProjects(response);
        }
    }

    return { submitTask, handleEditTask, handleRemoveTask };
}

export default useTodo;