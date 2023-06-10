async function sendData(data, type, setResult) {
  
  let NORMAL_URL = 'http://localhost:4000/';
  let API_URL    = '';
  let request    = type.split('-');

  console.log(request);

  switch(request[0])
  {
    case "user":
      API_URL = NORMAL_URL + 'users.php'
    break;
    case "task":
      API_URL = NORMAL_URL + 'task.php'
    break;
    case "project":
      API_URL = NORMAL_URL + 'project.php'
    break;
    default:
    break;
  }

  try {
    const requestBody = {
      type: type,
      data: data,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const responseData = await response.json();

      console.log(responseData);

      setResult(responseData);
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default sendData;
