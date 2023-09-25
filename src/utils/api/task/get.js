import getToken from "@/utils/helpers/getToken";

async function getTasks(project_id) {

    const API_URL_TASK = process.env.NEXT_PUBLIC_API_TASK;

    let token = getToken();
    
    if (!token) {

        return false;
    }

    try {

        const requestBody = { 

            project_id: project_id
        };

        const response = await fetch(API_URL_TASK, {

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
  
export default getTasks;