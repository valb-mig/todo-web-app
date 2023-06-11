import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookies } from 'cookies-next';
import { getTokenVerify } from '/src/utils/api/login';

const withSessionValidation = (WrappedComponent) => {
    
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {

        const cookies = getCookies();

        const token = cookies.authorization;
        if (token) {
            try {
            const decodedToken = getTokenVerify(token);
            // Token is valid, continue with the protected component
            } catch (error) {
            // Invalid token, redirect to login
            router.push('/login');
            }
        } else {
            // No token found, redirect to login
            router.push('/login');
        }

    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

// Your protected component that requires session validation
const HomePage = () => {
  return <div>Welcome to the homepage!</div>;
};

export default withSessionValidation(HomePage);