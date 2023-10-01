import Input from '@/app/components/Input';
import Icons from '@/config/icons';

import './styles/HeaderSearch.scss';

const HeaderSearch = ({ Error, OnChange, Value }) => {
    return(

        <Input.Root>
            <Input.Body Type='text' 
                        Placeholder='search' 
                        OnChange={OnChange} 
                        Value={Value} 
                        Error={Error} >
                <Input.Icon Icon={<Icons.Search/>}/>
            </Input.Body>
        </Input.Root>
    );
}

export default HeaderSearch;