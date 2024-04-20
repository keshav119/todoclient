// Sidebar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckSquare } from 'react-icons/fa';
import { selectButton } from '../Redux/reducers/sidebarReducer';

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectedButton = useSelector((state) => state.sidebar.selectedButton);

  const handleButtonClick = (item) => {
    dispatch(selectButton(item));
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gradient-to-r from-pink-600 to-purple-400 text-white">
      <div className="flex items-center gap-5 px-6 py-6 text-2xl">
        <FaCheckSquare />
        <span className="font-bold">Todo List</span>
      </div>
      <div className="flex flex-col py-4">
        <div
          className={`px-6 py-3 hover:bg-purple-700 transition ${
            selectedButton === 0 ? 'bg-purple-800' : ''
          }`}
          onClick={() => handleButtonClick(0)}
        >
          Dashboard
        </div>
        <div
          className={`px-6 py-3 hover:bg-purple-700 transition ${
            selectedButton === 1 ? 'bg-purple-800' : ''
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Work
        </div>
        <div
          className={`px-6 py-3 hover:bg-purple-700 transition ${
            selectedButton === 2 ? 'bg-purple-800' : ''
          }`}
          onClick={() => handleButtonClick(2)}
        >
          Personal
        </div>
        <div
          className={`px-6 py-3 hover:bg-purple-700 transition ${
            selectedButton === 3 ? 'bg-purple-800' : ''
          }`}
          onClick={() => handleButtonClick(3)}
        >
          Misc
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
