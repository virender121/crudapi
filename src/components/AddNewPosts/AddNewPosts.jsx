import React, { useState } from 'react';
import './AddNewPosts.css';
import Button from '../button/Button';

const AddNewPosts = ({ data, setData, setIsNewPopupOpen, isOpen, users }) => {
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: '', userName: '' });
    console.log(users)
  const handleNewPostSubmit = () => {

    const newId = data.length + 1;
    const newPostWithId = {
      id: newId,
      ...newPost,
    } 
  

 

    const updatedData = [...data, newPostWithId];
    setData(updatedData);

    setNewPost({ title: '', body: '', userId: '', userName: '' });
    setIsNewPopupOpen(false);
  
  } ;
  const buttonDelete = {
    backgroundColor: 'red',
    color: 'white',
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
     
      const selectedUser = users[value]; 
      const selectedUserName = selectedUser ? selectedUser.name : '';
      
      setNewPost((prevNewPost) => ({
        ...prevNewPost,
        [name]: value,
        userName: selectedUserName,
      }));
    } else {
      setNewPost((prevNewPost) => ({ ...prevNewPost, [name]: value }));
    }
  };
  

  const handleCancel = () => {
    setIsNewPopupOpen(false);
  };

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <h3>Add New Post</h3>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleNewPostChange}
        />
        <label>Body:</label>
        <input
          type="text"
          name="body"
          value={newPost.body}
          onChange={handleNewPostChange}
        />
        <label>Author Name:</label>
        
        <select
        name="userId"
        // value={newPost.userName}
        onChange={handleNewPostChange}
      >
       
        {Object.values(users).map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))} 
      </select>
      


      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <Button onClick={handleNewPostSubmit} className="btn" name="Submit"/>
          
        
        <Button onClick={handleCancel} className="btn-cancle" name="Cancle" style={buttonDelete}/>
         
        </div>
      </div>
    </div>
  );
};

export default AddNewPosts;
