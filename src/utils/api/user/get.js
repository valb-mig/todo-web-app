import getToken from '@/utils/helpers/getToken';

async function handleUser(ambient = 'PRODUCTION') {

    if(ambient === 'PRODUCTION') {

        const API_USER = `${process.env.NEXT_PUBLIC_API_USER}`;

        let token = getToken();

        if (!token) return false;

        try {
            
            const response = await fetch(API_USER, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });

            if (!response.ok) throw new Error(`Bad request: ${response.status}`);

            const res = await response.json();
    
            if (res.success) {
                return res;
            } else {
                throw new Error('(error)(Api/User): Unsuccessful response');
            }

        } catch (error) {

            console.error(`(error)(Api/User): ${error}`)
            return false;
        }
        
    } else if (ambient === 'DEVELOPMENT') {

        console.info('(success)(Api/User): No database version')
        return true;
    
    } else {

        console.error(`(error)(Api/User): Invalid environment: ${ambient}`);
        return false;
    }
}

export default handleUser;