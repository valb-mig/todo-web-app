import getToken from "@/utils/helpers/getToken";

export default async function editTask(task_id, project_id, done) {

    const API_URL_TASK_EDIT = process.env.NEXT_PUBLIC_API_TASK_EDIT;

    let token = getToken();

    if (!token) {
        return { token: false };
    }

    try {

        const requestBody = { 

            project_id: project_id,
            task_id:    task_id,
            status:     done
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

            return false;    
        }

    } catch (error) {
        
        console.error('[Api]: Error: '+error)
        return false;
    }
}