import addProject  from '@/utils/api/project/add';
import cleanObject from '@/utils/helpers/cleanObject';

export default async function modalSubmit(modalFormData, setModalFormData, selectedProject) {

    if(modalFormData.title !== "" && modalFormData.icon !== "" && modalFormData.days !== ""){

        let response = await addProject(modalFormData, selectedProject.type);
    
        if (response && response.success != null && response.success != undefined) {

            if(response.success) {
                setModalFormData(cleanObject(modalFormData));
                return true;
            } else {
                console.error("[Database]: Error");
                return false;
            }

        } else {

            console.warn('[Projects]: No database');

            let newProject = {

                project_title: modalFormData.title,
                project_icon: 'list',
                project_tasks:[]
            }

            setModalFormData(cleanObject(modalFormData));
            return newProject;
        }
    
    } else {
        return false;
    }
}