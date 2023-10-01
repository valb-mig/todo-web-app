'use client';

import React, {useState, useEffect} from 'react';

import { useGlobalContext } from '@/config/context/store';
import { useRouter } from 'next/navigation';

import Layout  from '@/app/home/config/layout';
import Loading from '@/app/home/loading';

import handleUser from '@/utils/api/user/get';

const Validate = ({ children }) => {

    const { userData, setUserData } = useGlobalContext();
    const [ loading, setLoading ]   = useState(true);

    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {

        const response = await handleUser(userData.data.ambient);

        if(response) {

            try {

                if(response.success !== null && response.success !== undefined) {

                    if (response?.success) {

                        setUserData({
                            username: response.user.name,
                            data: {
                                logged: true,
                                ambient: 'PRODUCTION'
                            }
                        });

                    } else {
                        router.push('/login');
                    }

                } else {

                    setUserData({
                        username: 'Jhon Doe',
                        data: {
                            logged: false,
                            ambient: 'DEVELOPMENT'
                        }
                    });
                }

            } catch (error) {
                console.error("(error)(getData): Error: "+error);
            } finally {
                setLoading(false);
            }

        } else {
            console.error('(error)(getData): Response Error');
        }
    }

    if (loading) <Loading/>

    return userData ? (
        <Layout>
            { children }
        </Layout>
    ) : null;
}

export default Validate;