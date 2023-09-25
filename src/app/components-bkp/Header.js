import React, { useState } from 'react';
import { useGlobalContext } from '@/config/context/store';
import changeTheme from '@/utils/func/changeTheme';

import Input  from '@/app/components/Input';
import Button from '@/app/components/Button';
import Popup  from '@/app/components/Popup';

import { 
  AiOutlineMenu
} from 'react-icons/ai';

import { 
  BsFillSunFill,
  BsFillMoonFill
} from 'react-icons/bs';

import { 
  MdClose 
} from 'react-icons/md';

// import UserTag from '@/layout/UserTagLayout';
// import Layout  from '@/layout/HeaderLayout';

const Header = ({}) => {

    const { userData } = useGlobalContext();

    const [popup,     setPopup]     = useState(false);
    const [darkTheme, setDarkTheme] = useState(true);

    return (<></>);

    // return(
    //     <Layout.Root>
    //         <Layout.Start>
    //             <Input
    //                 Id='search'
    //                 Placeholder='Search'
    //             />
    //         </Layout.Start>

    //         <Layout.End>

    //             {/* { userData && userData.username != '' && userData.username != null ? (

    //                 <UserTag.Root>
    //                     <UserTag.Name
    //                         Name={ userData.username }
    //                     />
    //                     <UserTag.Icon/>
    //                 </UserTag.Root>

    //             ):null } */}
                
    //             <Button
    //                 Icon={ darkTheme ? <BsFillSunFill/> : <BsFillMoonFill/> }
    //                 OnClick={() => {changeTheme(setDarkTheme,darkTheme)}}
    //             />
    //             <Button
    //                 Icon={popup ? <MdClose/> : <AiOutlineMenu/>}
    //                 OnClick={() => {setPopup(!popup)}}
    //             />

    //             {popup ? (

    //                 <Popup>
    //                     <Button
    //                         Title="Login"
    //                         OnClick={() => {router.push("/login") && setPopup(!popup)}}
    //                     />
    //                     <Button
    //                         Title="Register"
    //                         OnClick={() => {router.push("/register") && setPopup(!popup)}}
    //                     />
    //                 </Popup>

    //             ):null }
    //         </Layout.End>

    //     </Layout.Root>
    // );
}

export default Header;