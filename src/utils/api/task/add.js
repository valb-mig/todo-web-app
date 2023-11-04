import getToken from "@/utils/helpers/getToken";

export default async function addTask(project_id, task, ambient = 'PRODUCTION') {

    if(ambient === 'PRODUCTION') {

        const API_URL_TASK_ADD = process.env.NEXT_PUBLIC_API_TASK_ADD;

        let token = getToken();
        
        if (!token) { return false }

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

                    return res.added_task;
                }
                else {

                    console.error('(error)(Api/Project/Add): Response error');
                    return false;
                }
                
            } else {
                
                console.error('(error)(Api/Project/Add): Bad request');
                return false;     
            }

        } catch (error) {
            
            console.error('(error)(Api/Project/Add): Error: '+error);
            return false;
        }

    } else if (ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/Project/Add): No database version');
        return true;      
    }
}