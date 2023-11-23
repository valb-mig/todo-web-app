import { useGlobalContext } from '@/config/context/store';

const helpGeneral = () => {

    const { userData, setUserData } = useGlobalContext();

    const getToken = () => {

        let token = window.localStorage.getItem('laravelSessionToken');

        if(logged !== null){

            if (typeof window !== 'undefined' && token && !logged) {
                return token;
            }
        }

        if(token){
            return token;
        }

        return false;
    }

    const changeTheme = () => {

        const element = document.body.classList;

        element.toggle('dark');
        element.toggle('light');

        setUserData({...userData, darkTheme:!userData.darkTheme});
    }

    const cleanObject = () => {

        const updatedObj = {};

        for (const key in obj) {
      
          switch (typeof obj[key]) {
      
            case 'string':
              updatedObj[key] = '';
            break;
            
            case 'number':
              updatedObj[key] = 0;
            break;
      
            case 'boolean':
              updatedObj[key] = false;
            break;
          
            default:
              updatedObj[key] = null;
            break;
          }
        }
      
        return updatedObj;
    }
    
    return { getToken, changeTheme, cleanObject };
}

export default helpGeneral;