import getToken from "@/utils/functions/getToken";

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

                return res;

            }
            else {

                return false;
            }
            
        } else {
            
            return false        
        }

    } catch (error) {
        throw new Error('Error fetching data: ' + error);
    }
}
  
export default addTask;