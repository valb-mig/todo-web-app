async function getProject() {

    const API_URL_PROJECT = process.env.NEXT_PUBLIC_API_PROJECT;

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
        };

        const response = await fetch(API_URL_PROJECT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
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
  
export default getProject;