import getToken from "@/utils/helpers/getToken";

export default async function editTask(task_id, project_id, edit, ambient) {

    if(ambient === 'PRODUCTION') {

        const API_URL_TASK_EDIT = process.env.NEXT_PUBLIC_API_TASK_EDIT;

        let token = getToken();

        if (!token) { return false; }

        let value = null;

        if(typeof edit.value === "object") {
            value = edit.value;
        } else {
            value = edit.value.toString();
        }

        try {
    
            const requestBody = { 
    
                project_id: project_id,
                task_id: task_id,
                action: edit.action,
                value: value
            };
    
            console.log(requestBody);

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
    
                console.error('(error)(Api/Project/Edit): Bad request')
                return false;     
            }
    
        } catch (error) {
            
            console.error('(error)(Api/Project/Edit): Error: '+error)
            return false; 
        }

    } else if(ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/Project/Edit): No database version')
        return true;  
    }
}