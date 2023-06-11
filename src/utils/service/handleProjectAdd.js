import project from '/src/utils/api/project';
import { isEmpty } from 'validator';
import { getCookies } from 'cookies-next';
import handleChangeUrl from '/src/utils/functions/handleChangeUrl';

export default function handleProjectAdd(event, body, setError) {

  event.preventDefault();

  body.id_user  = '16';
  body.username = 'ivalber';

  project(body)

  .then((verify) => {
    if (verify) {
      setError('');
    } else {
      setError('error');
    }
  })

  .catch((error) => {
    console.error('Error:', error);
  });
}