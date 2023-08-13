import getToken from "@/utils/functions/getToken";

async function addTask(id_project,task) {

    const API_URL_TASK_ADD = process.env.NEXT_PUBLIC_API_TASK_ADD;

    let token = getToken();
    
    if(!token) {
        return false;
    }

    if( task.title === '' || task.desc === '' ){
        return false;
    }

    try {

        const requestBody = { 
            token: token,
            id_project:id_project,
            task_title:task.title,
            task_desc:task.desc
        };

        const response = await fetch(API_URL_TASK_ADD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
  
export default addTask;