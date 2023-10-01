import addTask from '@/utils/api/task/add';

export default async function taskAdd(selectedProject, taskFormData, projects, ambient) {

    if(taskFormData.title !== "" && taskFormData.desc !== ""){

        let response = await addTask(selectedProject.id, taskFormData, ambient);
    
        let newTask = {};

        if (typeof response === 'boolean') {

            if(response) {

                newTask = {

                    task_id: projects[selectedProject.type][selectedProject.id].project_tasks.length + 1,
                    user_id:'999',
                    project_id:selectedProject.id,
                    task_title:taskFormData.title,
                    task_desc:taskFormData.desc,
                    task_type:selectedProject.type,
                    task_done:false,
                    task_status:'A'
                }
                
            } else {
                return false;
            }

        } else if (typeof response === 'object') {
            newTask = response.added_task;
        }

        return {
            ...projects,
    
                [selectedProject.type]:{
    
                    ...projects[selectedProject.type],
    
                    [selectedProject.id]:{
    
                        ...projects[selectedProject.type][selectedProject.id],
                        project_tasks:[
                            ...projects[selectedProject.type][selectedProject.id].project_tasks,
                            newTask
                        ],
                    }
                }
        }

    } else {
        return false;
    }
}