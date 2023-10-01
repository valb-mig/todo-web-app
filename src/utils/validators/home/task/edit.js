import taskEdit from '@/utils/api/task/edit';

export default async function editTask(selectedProject, projects, task_id, task_key, status) {

    const updatedTasks = projects[selectedProject.type][selectedProject.id].project_tasks.map((task, index) => {
        if (index === task_key) {
            return { ...task, task_done: status };
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

    let response = await taskEdit(task_id, selectedProject.id, status);

    if(response) {
        return updatedProjects;
    }

    return false;
}