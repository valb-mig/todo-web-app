import getToken from "@/utils/helpers/getToken";

async function getProject(ambient = 'PRODUCTION') {

    if(ambient === 'PRODUCTION') {

        const API_URL_PROJECT = process.env.NEXT_PUBLIC_API_PROJECT;

        let token = getToken();
        
        if (!token) { return false; }
    
        try {
            
            const response = await fetch(API_URL_PROJECT, {
    
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
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
    
                return false;      
            }
    
        } catch (error) {
    
            console.error('(error)(Api/Project): Error: '+error);
            return false;
        }
        
    } else if (ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/Project): No database version')

        return {
            projects: {
                todo:[

                ],
                kanban:[

                ]
            }
        };
    }
}
  
export default getProject;