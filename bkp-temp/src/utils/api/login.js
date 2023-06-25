async function login(data) {

    const API_URL_USERS = process.env.NEXT_PUBLIC_API_URL_USERS;

    try {
        const requestBody = { type: 'user-verify', data: data };

        const response = await fetch(API_URL_USERS, {
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
  
export default login;