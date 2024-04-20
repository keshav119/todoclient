import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { API_BASE_URL, API_ROUTES, LOCAL_TOKEN_NAME } from '../apiConfig';
import { toast } from 'react-toastify';
import { FaRegSquareCheck } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Dashboard from './Dashboard';
import { MdDelete } from 'react-icons/md';

const Tasks = () => {
  
  const selectedButton = useSelector((state) => state.sidebar.selectedButton);
  const user = useSelector(state => state.auth.user);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    priority: ''
  });
  const [tasks, setTasks] = useState([]);
  const [subtaskFormData, setSubtaskFormData] = useState({
    title: '',
    description: '',
    difficulty: ''
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    if (selectedButton !== 0) {
      setShowAddItem(false);
      setShowAddSubtask(false);
      fetchData();
    }
  }, [selectedButton]);

  const fetchData = async () => {
    try {
      const payload = {
        user_id: user.user.id,
        category_id: selectedButton
      };
      const token = localStorage.getItem(LOCAL_TOKEN_NAME);
      const response = await axios.post(`${API_BASE_URL}${API_ROUTES.getTaskList}`, payload, { headers: { 'Authorization': `Bearer ${token}` } });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  }

  const handleEndDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
  }

  const handleAddItem = () => {
    setShowAddItem(true);
    setShowAddSubtask(false);
  }

  const handleCancelAddItem = () => {
    setShowAddItem(false);
    setFormData({
      title: '',
      description: '',
      startDate: null,
      endDate: null,
      priority: ''
    });
  }

  const fetchSubTasks = async (itemId) => {
    setSelectedTaskId(itemId);
    try {
      const response = await axios.get(`${API_BASE_URL}${API_ROUTES.getTask}${itemId}/`);
      const updatedTasks = tasks.map(task => {
        if (task.id === itemId) {
          return { ...task, subtasks: response.data.tasks };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error fetching subtasks:', err);
    }
  }

  const handleSubtaskInputChange = (e) => {
    setSubtaskFormData({ ...subtaskFormData, [e.target.name]: e.target.value });
  }

  const handleAddSubtask = async (e) => {
    
    e.preventDefault();
    if(subtaskFormData.title !== '' || subtaskFormData.description !== '')
    try {
      const payload = {
        title: subtaskFormData.title,
        description: subtaskFormData.description,
        difficulty: subtaskFormData.difficulty ? subtaskFormData.difficulty : 1,
        task_list_id: selectedTaskId
      };
      const token = localStorage.getItem(LOCAL_TOKEN_NAME);
      const response = await axios.post(`${API_BASE_URL}${API_ROUTES.createTask}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success === true) {
        // Update subtasks for the selected task
        fetchSubTasks(selectedTaskId);
        setShowAddItem(false);
      } else {
        toast.error('Failed to add subtask', { autoClose: 1000, style: { width: '300px' } });
      }
    } catch (error) {
      console.error('Error adding subtask:', error);
      toast.error('Failed to add subtask', { autoClose: 1000, style: { width: '300px' } });
    }
  }

  const updateStatus = async (item) => {
    const payload = {
      status: !item.status
    }
    const token = localStorage.getItem(LOCAL_TOKEN_NAME)
    try {
      const response = await axios.put(`${API_BASE_URL}${API_ROUTES.updateTask}${item.id}/`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchData();
      fetchSubTasks(selectedTaskId);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  }

  const deleteTaskList = async (item) => {
    try{
      const token = localStorage.getItem(LOCAL_TOKEN_NAME)
      const response = await axios.delete(`${API_BASE_URL}${API_ROUTES.deleteTaskList}${item}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if(response.status === 200){
        fetchData()
        toast.success("Deleted Successfully", { autoClose: 1000, style: { width: '300px' } })
      }
    }catch(err){
      toast.error(err, { autoClose: 1000, style: { width: '300px' } });
    }
  }

  const deleteSubTask = async (item) => {
    try{
      const token = localStorage.getItem(LOCAL_TOKEN_NAME)
      const response = await axios.delete(`${API_BASE_URL}${API_ROUTES.deleteTask}${item}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if(response.status === 200){
        fetchData()
        toast.success("Deleted Successfully", { autoClose: 1000, style: { width: '300px' } })
      }
    }catch(err){
      toast.error(err, { autoClose: 1000, style: { width: '300px' } });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartDate = formData.startDate ? format(formData.startDate, 'yyyy-MM-dd') : null;
    const formattedEndDate = formData.endDate ? format(formData.endDate, 'yyyy-MM-dd') : null;

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        priority: formData.priority,
        category_id: selectedButton,
        user_id: user.user.id
      };
      const token = localStorage.getItem(LOCAL_TOKEN_NAME);
      const response = await axios.post(`${API_BASE_URL}${API_ROUTES.createTaskList}`, payload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(response)

      if (response.data.success === true) {
        setShowAddItem(false);
        fetchData();
      } else {
        toast.error('Failed to create', { autoClose: 1000, style: { width: '300px' } });
      }
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error('Failed', { autoClose: 1000, style: { width: '300px' } });
    }
  }

  return (
    <div className="container mx-auto px-4 bg-pink-200 py-8">
      <div className="grid grid-cols-1 gap-4">
        {selectedButton === 0 ? (
          <div>
          <Dashboard/>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="flex flex-col justify-between border bg-pink-400 border-gray-300 p-4 transition-all rounded-lg shadow-md" onClick={(e) => { e.stopPropagation(); fetchSubTasks(task.id) }}>
             
             <div className='flex flex-row justify-between items-center'>
              <div className="flex flex-col mb-2">
                <div className="font-semibold text-lg">{task.title}</div>
                <div className="text-gray-600">{task.description}</div>
              </div>
              <div className='flex flex-row  items-center gap-10'>
              <div className="flex flex-col gap-4">
                <div className="text-sm text-gray-500">Due Date: {task.end_date}</div>
                <div className={`${task.priority === 1 ? 'bg-red-500' : task.priority === 2 ? 'bg-orange-400' : 'bg-yellow-500'} text-white px-2 py-1 rounded-lg`}>Priority: {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}</div>
                
                  </div>
                  <div className="flex items-center space-x-2">
                  
                  <div className="flex flex-row  items-center justify-center rounded-full gap-10">
                    <div className='flex flex-col gap-2' >
                    <div className='w-24 h-24'>
                      <CircularProgressbar value={(task.completed_tasks / task.total_tasks) * 100} text={`${((task.completed_tasks / task.total_tasks) * 100).toFixed(2)}%`} />
                    </div>
                    <div className='bg-orange-400 text-white flex items-center justify-center px-2 rounded-lg'>{task.completed_tasks}/{task.total_tasks}</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                  
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => deleteTaskList(task.id)}>Delete</button>
                </div>
                </div>
                </div>
              </div>
              </div>
              {selectedTaskId === task.id && (
                <div>
                  {task.subtasks && task.subtasks.map((subtask, subIndex) => (
                    <div key={subIndex} className="flex justify-between items-center border border-gray-300 bg-pink-100 py-1 px-4 rounded-lg mt-4">
                      <div className='flex flex-row gap-3 items-center'>
                        <button onClick={(e) => { e.stopPropagation(); updateStatus(subtask) }}>{subtask.status ? <FaCheckSquare /> : <FaRegSquareCheck />}</button>
                        <div>
                          <div className={`font-semibold text-lg ${subtask.status ? 'line-through text-gray-400' : ''}`}>{subtask.title}</div>
                          <div className={`${subtask.status ? 'line-through text-gray-400' : 'text-gray-600'}`}>{subtask.description}</div>
                        </div>
                      </div>
                      <div className='flex flex-row gap-5'>
                      <div className={`${subtask.difficulty === 1 ? 'bg-red-500' : subtask.difficulty === 2 ? 'bg-orange-400' : 'bg-yellow-400'} flex items-center p-2 text-nowrap text-white h-fit w-fit rounded-full`}>Difficulty: {subtask.difficulty === 1 ? 'Hard' : subtask.difficulty === 2 ? 'Medium' : 'Easy'}</div>
                      <button className='bg-red-500 hover:bg-red-700 rounded-lg px-2 text-white font-semibold flex  gap-2 flex-row items-center' onClick={()=>deleteSubTask(subtask.id)}><MdDelete/> Delete</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>{setShowAddSubtask(true)}} className="bg-blue-500 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded mt-4">+ Add Subtask</button>
                  {showAddSubtask && (
                    <form onSubmit={handleAddSubtask} className="mt-4">
                      <input type="text" name="title" value={subtaskFormData.title} onChange={handleSubtaskInputChange} placeholder="Title" className="block w-full mb-2 p-2 border border-gray-300 rounded-md shadow-sm" />
                      <textarea name="description" value={subtaskFormData.description} onChange={handleSubtaskInputChange} placeholder="Description" className="block w-full mb-2 p-2 border border-gray-300 rounded-md shadow-sm" />
                      <div className="mb-2 w-fit ">
                        <label className='font-semibold'>Difficulty:</label>
                        <select
                          name="difficulty"
                          value={subtaskFormData.difficulty}
                          onChange={handleSubtaskInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        >
                          <option value="1">Hard</option>
                          <option value="2">Medium</option>
                          <option value="3">Easy</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add</button>
                        <button onClick={() => setShowAddSubtask(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        
        {(selectedButton === 1 || selectedButton === 2 || selectedButton === 3) && (
          <div>
            <button onClick={()=>handleAddItem()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+ Add New Item</button>
            {showAddItem && (
              <form onSubmit={handleSubmit} className="mt-4">
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="block w-full mb-2 p-2 border border-gray-300 rounded-md shadow-sm" />
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="block w-full mb-2 p-2 border border-gray-300 rounded-md shadow-sm" />
                <div className='flex flex-row gap-5'>
                <div className="mb-2">
                  <label className='font-semibold'>Start Date:</label>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={handleStartDateChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-2">
                  <label className='font-semibold'>End Date:</label>
                  <DatePicker
                    selected={formData.endDate}
                    onChange={handleEndDateChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className=" flex flex-row items-center mb-2">
                  <label className='font-semibold'>Priority:</label>
                  <select name="priority" value={formData.priority} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="">Select Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>
                </div>
                
                <div className="flex justify-end gap-4">
                 
                  <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                  <button type="button" onClick={handleCancelAddItem} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
