import addProject  from '@/utils/api/project/add';
import cleanObject from '@/utils/helpers/cleanObject';

export default async function modalValidation(modalFormData, setModalFormData, selectedProject) {

    let response = await addProject(modalFormData, selectedProject.type);
    
    if (response && response.success != null && response.success != undefined) {

        if(response.success) {
            setModalFormData(cleanObject(modalFormData));
            return true;
        } else {
            console.log("Database error!");
            return false;
        }

    } else if(modalFormData.title !== "" && modalFormData.icon !== "" && modalFormData.days !== ""){

        console.log('Projects: No database');

        let newProject = {

            project_title: modalFormData.title,
            project_icon: 'list',
            project_tasks:[]
        }

        setModalFormData(cleanObject(modalFormData));
        return newProject;

    } else {
        setModalFormData({...modalFormData, error: true})
        return false;
    }
}