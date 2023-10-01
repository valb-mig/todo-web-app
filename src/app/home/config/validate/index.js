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

        const response = await handleUser();

        if(response) {

            try {

                if(response.success !== null && response.success !== undefined) {

                    if (response?.success) {

                        setUserData({
                            username: response.user.name,
                            logged:   true
                        });
                    } else {
                        router.push('/login');
                    }

                } else {

                    setUserData({
                        username: "Jhon doe",
                        logged: false
                    });

                    localStorage.setItem('laravelSessionToken', 'test-token');
                }
            } catch (error) {
                console.error("[Error]: "+error);
            } finally {
                setLoading(false);
            }
        }
        else {
            console.error('[Api]: Response Error');
        }

        console.clear();
    }

    if (loading) <Loading/>

    return userData ? (
        <Layout>
        { children }
        </Layout>
    ) : null;
}

export default Validate;