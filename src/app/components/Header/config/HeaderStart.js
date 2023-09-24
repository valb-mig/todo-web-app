import './styles/HeaderStart.scss';

import { useGlobalContext } from '@/config/context/store';

import Button from '@/app/components/Button';
import Icons  from '@/config/icons';

const HeaderStart = ({ children }) => {

    const { path, setScreenPath } = useGlobalContext();

    return(
        <div className='header-start'>

            <Button.Root OnClick={() => {setScreenPath({
                current:{home:true}, 
                breadcrumbs:['home'] 
            }) && console.log(path)}}>
                <Button.Icon Icon={<Icons.Home/>} />
            </Button.Root>

            <div className='header-logo'>
                <div className='site-title'><p>./Todo.sh</p><span className='title-cursor'>|</span></div>
            </div>

            { children }

        </div>
    );
}

export default HeaderStart;