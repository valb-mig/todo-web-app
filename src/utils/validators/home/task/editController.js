import taskEdit from '@/utils/api/task/edit';

export default async function editTask(selectedProject, projects, task_id, task_key, task_column, edit, ambient) {

    const tasks = projects[selectedProject.type][selectedProject.id].project_tasks;

    console.info(task_id, task_key, task_column);

    const updatedTasks = Object.values(tasks).map((task, index) => {

        console.log(index, task.task_id, task.task_column);

        if (index === task_key && task.task_id == task_id && task.task_column == task_column) {
            
            console.log(task);
        }

        return task;
    });

    const updatedProject = {
        ...projects[selectedProject.type][selectedProject.id],
        project_tasks: updatedTasks,
    };

    const updatedProjectType = {
        ...projects[selectedProject.type],
        [selectedProject.id]: updatedProject,
    };

    const updatedProjects = {
        ...projects,
        [selectedProject.type]: updatedProjectType,
    };

    let response = await taskEdit(task_id, selectedProject.id, edit, ambient); //[Todo] - Pass task column to API

    if(response == true) {
        return updatedProjects;
    }

    return false;
}