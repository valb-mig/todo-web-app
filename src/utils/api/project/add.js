async function addProject(project,type) {

    const API_URL_PROJECT_ADD = process.env.NEXT_PUBLIC_API_PROJECT_ADD;

    let token = "";
    
    if(window.localStorage.getItem('laravelSessionToken'))
    {
        token = window.localStorage.getItem('laravelSessionToken');
    }
    else
    {
        return false;
    }

    try {
        const requestBody = { 
            token: token,
            type: type,
            title: project.title,
            icon_name: project.icon_name,
            days: project.days
        };

        const response = await fetch(API_URL_PROJECT_ADD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
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
  
export default addProject;