const API_BASE_URL = 'http://127.0.0.1:8000/todo';

const API_ROUTES = {
    login: '/login/',
    register: '/register/',
    logout: '/logout/',

    createTaskList: '/createTasksList/',
    getTaskList: '/getTasksList/',
    editTaskList: '/editTasksList/',
    deleteTaskList: '/deleteTasksList/',

    createTask: '/createTask/',
    getTask: '/getTask/',
    updateTask: '/updateTask/',
    deleteTask: '/deleteTasks/',
}

export {API_BASE_URL, API_ROUTES};