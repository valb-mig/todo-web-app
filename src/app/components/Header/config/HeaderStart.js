import './styles/HeaderStart.scss';

import { useGlobalContext } from '@/config/context/store';

import Button from '@/app/components/Button';
import Icons  from '@/config/icons';

const HeaderStart = ({ children }) => {

    const { path, setScreenPath, setSelectedProject } = useGlobalContext();

    const goHome = () => {

        setScreenPath({
            current:{home:true}, 
            breadcrumbs:['home'] 
        });

        setSelectedProject({
            id:    null,
            key:   null,
            type:  null,
            title: null,
            icon:  null,
        });
    }

    return(
        <div className='header-start'>

            <Button.Root 
            Selected={path.current.home}
            OnClick={() => goHome()}>
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