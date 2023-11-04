import taskEdit from '@/utils/api/task/edit';

export default async function editTask(selectedProject, projects, task_info, edit, ambient) {

    const {type, id} = selectedProject;

    const tasks = projects[type][id].project_tasks;

    const updatedTasks = Object.values(tasks).map((task) => {

        if (task.task_order_key === task_info.order && task.task_id === task_info.id && task.task_column === task_info.column) {
            task.task_done = !task.task_done;
        }

        return task;
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

    let response = await taskEdit(task_info.id, id, edit, ambient);

    if(response == true) {

        return updatedProjects;
    }

    return false;
}