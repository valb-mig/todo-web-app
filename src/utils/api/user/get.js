import getToken from '@/utils/helpers/getToken';

async function handleUser() {

  let token = getToken();

  const API_USER = process.env.NEXT_PUBLIC_API_USER;

  if (token === '') {

      return false;
  }

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
            
              return { success:false };
          }

      } else {
        return { connection:false };
      }

  } catch (error) {
    return { connection:false };
  }
}

export default handleUser;