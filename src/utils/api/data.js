const API_URL = 'http://localhost:4000/users.php';

// import axios from 'axios';

async function sendData(data, type, setResult) {
  
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
      setResult(responseData);
    } else {
      console.error('Error:', response.status);
    }

    // axios.post(API_URL,JSON.stringify(requestBody))
    // .then(response => console.log(response))
    // .catch(err => console.log(err));

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default sendData;
