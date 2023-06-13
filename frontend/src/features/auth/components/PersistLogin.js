import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRefreshMutation } from '../authApiSlice';
import { selectCurrentToken } from '../authSlice';
import { PulseLoader } from 'react-spinners';

const PersistLogin = () => {
    const token = useSelector(selectCurrentToken);

    const effectRan = useRef(false);

    const [refresh, { isLoading }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 
            // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                } catch (err) {
                    console.error(err);
                }
            };
            if (!token) verifyRefreshToken();
        }
        return () => (effectRan.current = true);

        // eslint-disable-next-line
    }, []);

    let content;
    if (isLoading) {
        content = <PulseLoader color={'#FFF'} />;
    } else {
        content = <Outlet />;
    }
    return content;
};

export default PersistLogin;
