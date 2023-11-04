async function handleLogin(data, ambient = 'PRODUCTION') {

    if(ambient === 'PRODUCTION') {

        const API_LOGIN = `${process.env.NEXT_PUBLIC_API_LOGIN}`;

        try {
    
            const requestBody = { 
    
                username: data.username.value, 
                password: data.password.value 
            };
    
            const response = await fetch(API_LOGIN, {
    
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(requestBody),
            });
    
            if (!response.ok) throw new Error(`Bad request: ${response.status}`);

            const res = await response.json();

            if(res.success) {

                localStorage.setItem('laravelSessionToken', res.remember_token);
                return true;
            }
            else {
                throw new Error('(error)(Api/User/Login): Unsuccessful response');
            }
    
        } catch (error) {
            
            throw new Error('Error fetching data: ' + error);
        }
        
    } else if(ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/User/Login): No database version')
        return true;

    } else {

        console.error(`(error)(Api/User/Login): Invalid environment: ${ambient}`);
        return false;
    }
}

export default handleLogin;