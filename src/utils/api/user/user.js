async function handleUser(token) {

  const API = process.env.NEXT_PUBLIC_API_USER;

  if(token === ''){
      return false;
  }

  try {
      const requestBody = { 
          token: token, 
      };

      const response = await fetch(API, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify(requestBody),
      });

      if (response.ok) {

          let res = await response.json();

          if(res.success) {
              return res;
          }
          else {
              return {success:false};
          }

      } else {
          return {success:false};
      }

  } catch (error) {
    return {success:false};
  }
}

export default handleUser;