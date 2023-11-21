import { useGlobalContext } from '@/config/context/store';

const useGreetings = () => {

    const { projects } = useGlobalContext();

    const countTotalTasks = () => {

        let countTasks = 0;

        ['todo', 'kanban'].map((type) => {

            Object.values(projects[type]).map((project) => {
                countTasks += project.project_tasks.length;
            })
        })

        return countTasks;
    }

    const countDoneTotalTasks = () => {

        let countTasks = 0;

        ['todo', 'kanban'].map((type) => {

            Object.values(projects[type]).map((project) => {

                Object.values(project.project_tasks).map((task) => {
                    if(task.task_done === true){
                        countTasks++;  
                    }
                })
            })
        })

        return countTasks;
    }

    return { countTotalTasks, countDoneTotalTasks };
}

export default useGreetings;