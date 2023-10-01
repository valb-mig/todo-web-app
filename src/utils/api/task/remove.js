import getToken from "@/utils/helpers/getToken";

async function removeTask(task_id, project_id, ambient) {

    if(ambient === 'PRODUCTION') {

        const API_URL_TASK_REMOVE = process.env.NEXT_PUBLIC_API_TASK_REMOVE;

        let token = getToken();
        if (!token) { return false; }

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

                return true;

            } else {

                console.error('(error)(Api/Project/Remove): Response error')
                return false;        
            }

        } catch (error) {

            console.error('(error)(Api/Project/Remove): Error: '+error)
            return false;
        }

    } else if (ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/Project/Remove): No database version')
        return true;  
    }
}
  
export default removeTask;