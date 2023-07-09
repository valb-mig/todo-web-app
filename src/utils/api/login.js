async function handleLogin(data) {

    const API = process.env.NEXT_PUBLIC_API_LOGIN;

    if(data.username.value === '' || data.password.value === ''){
        return false;
    }

    try {

        const requestBody = { 
            username: data.username.value, 
            password: data.password.value 
        };

        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {

            let res =  await response.json();

            if(res.success) {

                localStorage.setItem('laravelSessionToken', res.token);
            }
            else
            {
                return false;
            }

        } else {

            throw new Error('Error: ' + response.status);
            
        }

    } catch (error) {
        throw new Error('Error fetching data: ' + error);
    }
}

export default handleLogin;