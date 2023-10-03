import { useGlobalContext } from '@/config/context/store';

const useDragDrop = () => {
   
    const handleDragEnd = (event) => {
        console.log(event);
    }

    return { handleDragEnd };
}

export default useDragDrop;