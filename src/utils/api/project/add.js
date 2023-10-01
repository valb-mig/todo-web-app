import getToken from "@/utils/helpers/getToken";

async function addProject(project, type, ambient = 'PRODUCTION') {

    if(ambient === 'PRODUCTION') {

        const API_URL_PROJECT_ADD = process.env.NEXT_PUBLIC_API_PROJECT_ADD;

        let token = getToken();
        
        if (!token) { return false; }
    
        try {
    
            const requestBody = { 
    
                project_type:  type,
                project_title: project.title,
                project_icon:  project.icon,
                project_days:  project.days
            };
    
            const response = await fetch(API_URL_PROJECT_ADD, {
    
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
    
                return true;
            } else {
    
                return false;        
            }
    
        } catch (error) {
            
            console.error('(error)(Api/Project/Add): Error: '+error)
            return false;
        }

    } else if (ambient === 'DEVELOPMENT') {

        let newProject = {

            project_title: project.title,
            project_icon: 'list',
            project_tasks:[]
        }

        return newProject;
    
    } else {
        console.error('(Ambient): No ambient found');
        return false;
    }
}
  
export default addProject;