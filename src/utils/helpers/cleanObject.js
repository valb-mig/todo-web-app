export default function cleanObject(obj) {

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