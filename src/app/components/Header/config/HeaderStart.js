import './styles/HeaderStart.scss';

import { useGlobalContext } from '@/config/context/store';
import { useRouter } from 'next/navigation';

import Button from '@/app/components/Button';
import Icons  from '@/config/icons';

const HeaderStart = ({ children }) => {

    const { setScreenPath } = useGlobalContext();

    return(
        <div className='header-start'>

            <Button.Root OnClick={() => setScreenPath({
                current:{home:true}, 
                breadcrumbs:['home'] 
            })}>
                <Button.Icon Icon={<Icons.Home/>} />
            </Button.Root>

            <div className='logo'>
                <div className='site-title'><p>./Todo.sh</p><span className='title-cursor'>|</span></div>
            </div>

            { children }

        </div>
    );
}

export default HeaderStart;