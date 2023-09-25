export default function cleanObject(obj) {
    const updatedObj = {};
  
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        updatedObj[key] = '';
      } else if (typeof obj[key] === 'boolean') {
        updatedObj[key] = false;
      } else {
        updatedObj[key] = null;
      }
    }
  
    return updatedObj;
  }