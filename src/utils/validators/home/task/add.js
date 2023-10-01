import addTask from '@/utils/api/task/add';

export default async function taskAdd(selectedProject, taskFormData, projects) {

    if(taskFormData.title !== "" && taskFormData.desc !== ""){

        let response = await addTask(selectedProject.id, taskFormData);
    
        let newTask = {};

        if (response) {

            if(response.success) {
                newTask = response.added_task;
            } else {
                console.error("[Database]: Error");
                return false;
            }

        } else {

            console.warn('[Projects]: No database');

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