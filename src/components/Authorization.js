import { useEffect } from 'react';
import { axiosInstance, ENDPOINTS } from '../api';

export default function Authorization() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location = '/Login';
            return;
        }

        axiosInstance
            .post(ENDPOINTS.AUTHEN, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((response) => {
                const data = response.data;
                if (data && data.status === 'ok') {
                    console.log('Authentication successful');
                } else {
                    console.log('Authentication failed');
                    // clear local storage and redirect to login
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('avatar_url');
                    localStorage.removeItem('created');
                    localStorage.removeItem('email');
                    localStorage.removeItem('name');
                    localStorage.removeItem('age');
                    localStorage.removeItem('bio');
                    localStorage.removeItem('occupation');
                    localStorage.removeItem('token');
                    window.location = '/Login';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                localStorage.removeItem('token');
                window.location = '/Login';
            });
    }, []);

    return null;
}
