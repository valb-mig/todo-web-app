import getToken from "@/utils/helpers/getToken";

async function addProject(project, type) {

    const API_URL_PROJECT_ADD = process.env.NEXT_PUBLIC_API_PROJECT_ADD;

    let token = getToken();
    
    if (!token) {

        return false;
    }

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

            return { success: true };

        } else {

            return { success: false }        
        }

    } catch (error) {
        
        return false;
    }
}
  
export default addProject;