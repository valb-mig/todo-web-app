import getToken from '@/utils/helpers/getToken';

async function handleUser(ambient = 'PRODUCTION') {

    if(ambient === 'PRODUCTION') {

        const API_USER = process.env.NEXT_PUBLIC_API_USER;

        let token = getToken();

        if (!token) { return false; }

        try {
            const response = await fetch(API_USER, {

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

                    console.error('(error)(Api/User): Bad request')
                    return false;
                }

            } else {

                console.error('(error)(Api/User): No connection')
                return false;
            }

        } catch (error) {

            console.error('(error)(Api/User): Error: '+error)
            return false;
        }
        
    } else if (ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/User): No database version')
        return true;
    }
}

export default handleUser;