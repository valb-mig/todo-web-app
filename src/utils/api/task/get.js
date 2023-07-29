import getToken from "@/utils/functions/getToken";

async function getTasks(id_project) {

    const API_URL_TASK = process.env.NEXT_PUBLIC_API_TASK;

    let token = getToken();
    
    if(!token) {

        return false;
    }

    try {

        const requestBody = { 
            token: token,
            id_project:id_project
        };

        const response = await fetch(API_URL_TASK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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