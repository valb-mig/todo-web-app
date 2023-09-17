import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/config/context/store';

import changeTheme from '@/utils/functions/changeTheme';

import './styles/HeaderEnd.scss';

import Icons from '@/config/icons';

import Button from '@/app/components/Button';
import Popup  from '@/app/components/Popup';

const HeaderEnd = ({ children }) => {

    const router = useRouter();

    const { userData } = useGlobalContext();
    const [ popup, showPopup ] = useState(false);

    return(
        <div className='header-end'>

            { children }

            <Button
                Icon={ userData.darkTheme ? <Icons.Sun/> : <Icons.Moon/> }
                OnClick={() => { changeTheme() }}
            />
            <Button
                Icon={popup ? <Icons.Close/> : <Icons.Grid/>}
                OnClick={() => showPopup(!popup)}
            />

            {popup ? (

                <Popup>
                    <Button
                        Title="Login"
                        OnClick={() => {router.push("/login") && setPopup(!popup)}}
                    />
                    <Button
                        Title="Register"
                        OnClick={() => {router.push("/register") && setPopup(!popup)}}
                    />
                </Popup>

            ):null }
        </div>
    );
}

export default HeaderEnd;