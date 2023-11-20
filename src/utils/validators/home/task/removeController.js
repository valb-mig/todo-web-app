import removeTask from '@/utils/api/task/remove';

export default async function taskRemove(selectedProject, projects, task_info, ambient) {

    const {type, id} = selectedProject;

    const tasks = projects[type][id].project_tasks;

    const updatedTasks = Object.values(tasks).filter((task) => {

        if(task.task_order_key !== task_info.order && task.task_id !== task_info.id){
            return task;
        } else {
            console.warn(`Task removida: ${task.task_title}`);
        }
    });

    const updatedProject = {
        ...projects[type][id],
        project_tasks: updatedTasks,
    };
    
    const updatedProjectType = {
        ...projects[type],
        [id]: updatedProject,
    };
    
    const updatedProjects = {
        ...projects,
        [type]: updatedProjectType,
    };

    let response = await removeTask(task_info.task_id, id, ambient);

    if(response == true) {
        return updatedProjects;
    }

    return false;
}