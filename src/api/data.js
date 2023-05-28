const API_URL = 'http://localhost:4000/api.php';

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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default sendData;
