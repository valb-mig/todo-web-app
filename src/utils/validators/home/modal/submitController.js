import addProject  from '@/utils/api/project/add';
import cleanObject from '@/utils/helpers/cleanObject';

export default async function modalSubmit(modalFormData, setModalFormData, selectedProject, userData) {

    if(modalFormData.title !== "" && modalFormData.icon !== "" && modalFormData.days !== "") {

        let response = await addProject(modalFormData, selectedProject.type, userData.data.ambient);

        if(typeof response === 'boolean') {

            if(response) {

                setModalFormData(cleanObject(modalFormData));
                return true;

            } else {
                return false;
            }

        } else if (typeof response === 'object') {

            setModalFormData(cleanObject(modalFormData));
            return response;
        }

    } else {

        return false;
    }
}