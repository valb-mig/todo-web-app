import getToken from "@/utils/functions/getToken";

async function editTask(id_task, id_project, action) {

    const API_URL_TASK_EDIT = process.env.NEXT_PUBLIC_API_TASK_EDIT;

    let token = getToken();
    
    if(!token) {
        return false;
    }

    try {

        const requestBody = { 
            id_project:id_project,
            id_task:id_task,
            action:action
        };

        const response = await fetch(API_URL_TASK_EDIT, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {

            return true;
        } else {
            return false        
        }

    } catch (error) {
        throw new Error('Error fetching data: ' + error);
    }
}
  
export default editTask;