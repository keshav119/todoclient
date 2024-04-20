const API_BASE_URL = 'http://127.0.0.1:8000';
// const API_BASE_URL = 'https://todo-api-iota-three.vercel.app';

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
    deleteTask: '/deleteTask/',

    getDashboardData: '/dashboardData/'
}

const LOCAL_TOKEN_NAME = 'laksjdhaklsjdh'

export {API_BASE_URL, API_ROUTES, LOCAL_TOKEN_NAME};