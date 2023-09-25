import getToken from "@/utils/helpers/getToken";

async function addTask(project_id,task) {

    const API_URL_TASK_ADD = process.env.NEXT_PUBLIC_API_TASK_ADD;

    let token = getToken();
    
    if (!token || ( task.title === '' || task.desc === '' ) ) {

        return false;
    }

    try {

        const requestBody = { 

            project_id: project_id,
            task_title: task.title,
            task_desc:  task.desc
        };

        const response = await fetch(API_URL_TASK_ADD, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {

            let res = await response.json();

            if(res.success) {

                return { success: true, added_task: res.task };

            }
            else {

                return { success: false };
            }
            
        } else {
            
            return false;     
        }

    } catch (error) {
        
        return false;
    }
}
  
export default addTask;