import getToken from "@/utils/functions/getToken";

async function removeTask(task_id, project_id) {

    const API_URL_TASK_REMOVE = process.env.NEXT_PUBLIC_API_TASK_REMOVE;

    let token = getToken();
    
    if (!token) {

        return false;
    }

    try {

        const requestBody = { 

            project_id: project_id,
            task_id:    task_id
        };

        const response = await fetch(API_URL_TASK_REMOVE, {

            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {

            return { success: true };

        } else {

            return false        
        }

    } catch (error) {

        return false;
    }
}
  
export default removeTask;