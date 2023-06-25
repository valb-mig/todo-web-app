async function project(data) {

    const API_URL_PROJECTS = process.env.NEXT_PUBLIC_API_URL_PROJECTS;

    try {
        const requestBody = { type: 'project-set', data: data };

        const response = await fetch(API_URL_PROJECTS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {

            const responseData = await response.json();
            return responseData;

        } else {

            throw new Error('Error: ' + response.status);
            
        }

    } catch (error) {
        throw new Error('Error fetching data: ' + error);
    }
}
  
export default project;