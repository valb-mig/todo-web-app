import getToken from "@/utils/helpers/getToken";

async function editTask(task_id, project_id, action) {

    const API_URL_TASK_EDIT = process.env.NEXT_PUBLIC_API_TASK_EDIT;

    let token = getToken();
    
    if (!token) {

        return false;
    }

    try {

        const requestBody = { 

            project_id: project_id,
            task_id:    task_id,
            action:     action
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

            return { success: true };

        } else {

            return { success: false };    
        }

    } catch (error) {
        
        return false;
    }
}
  
export default editTask;