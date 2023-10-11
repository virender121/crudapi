import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import AddNewPosts from '../AddNewPosts/AddNewPosts';
import './Posts.css';

const Posts = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState({});
 

  const buttonAdd = {
    backgroundColor: '#27ae60',
    color: 'white',
    marginLeft: '33px',
  };
  const buttonSave = {
    backgroundColor: '#27ae60',
    color: 'white',
    marginLeft: '33px',
  };
  const buttonEdit = {
    backgroundColor: 'blue',
    color: 'white',
  };
  const buttonDelete = {
    backgroundColor: 'red',
    color: 'white',
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setData(data));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        const usersObject = {};
        data.forEach((user) => {
          usersObject[user.id] = user;
        });
        setUsers(usersObject);
      });
  }, []);

  const getUserName = (userId) => {
    if (users?.[userId]) {
      return users?.[userId]?.name;
    }
    return 'Unknown';
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setSelectedAuthor((prevSelectedAuthor) => ({
      ...prevSelectedAuthor,
      [post.id] : post.userId
    }))
  };

  const openDeleteConfirmation = (postId) => {
    setPostToDelete(postId);
    setIsDeletePopupOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setPostToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      const updatedData = data.filter((post) => post.id !== postToDelete);
      setData(updatedData);
      setPostToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };
  

 

  const handleSave = () => {
    if (editingPost) {
      const updatedData = data.map((post) =>
        post.id === editingPost.id
          ? { ...post, title: editingPost.title, body: editingPost.body, userId: selectedAuthor[editingPost.id] }
          : post
      );
  
    
      // const updatedUserData = { ...users[editingPost.userId], name: getUserName(selectedAuthor) };
  
      // setUsers((prevUsers) => ({
      //   ...prevUsers,
      //   [editingPost.userId]: updatedUserData,
      // }));
  
      setData(updatedData);
      setEditingPost(null);
    }
  };
  

  
  
  




  const handleAdd = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <table>
        <thead className="header">
          <tr>
            <th className="header-content">Sr. No</th>
            <th className="header-content">Title</th>
            <th className="header-content">Body</th>
            <th className="header-content">Author</th>
            <th>
              <Button
                name="Add New"
                style={buttonAdd}
                onClick={handleAdd}
                className="btn-add"
              />
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#EEEEEE' }}>
          {console.log(data)}
          {data.map((post,index) => (
          
            <tr key={index}>
              <td>{index+1}</td>
              <td>
                {editingPost && editingPost.id === post.id ? (
                  <input
                    value={editingPost.title}
                    className="editinput"
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                  />
                ) : (
                  post.title
                )}
              </td>
              <td>
                {editingPost && editingPost.id === post.id ? (
                  <textarea
                    value={editingPost.body}
                    className="editinput"
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, body: e.target.value })
                    }
                  />
                ) : (
                  post.body
                )}
              </td>
            

       <td>
        {editingPost && editingPost.id === post.id ? (
        <select
        name="userId"
        value={selectedAuthor[post.id] || ''}
        onChange={(e) => setSelectedAuthor((prevSelectedAuthor) => ({
          ...prevSelectedAuthor,
          [post.id]: e.target.value
        }))}
      >
        <option value=""></option>
        {Object.values(users).map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      
       
        ) : (
          getUserName(post.userId)
        )}
      </td>
              <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                {editingPost && editingPost.id === post.id ? (
                  <Button name="Save" style={buttonSave} onClick={handleSave} />
                ) : (
                  <div>
                    <Button
                      name="Edit"
                      style={buttonEdit}
                      onClick={() => handleEdit(post)}
                    />
                    <Button
                      name="Delete"
                      style={buttonDelete}
                      onClick={() => openDeleteConfirmation(post.id)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isDeletePopupOpen && (
         <div className={`popup ${isDeletePopupOpen? 'open' : ''}`}>
         <div className="popup-content">
          <p>Are you sure you want to delete this post?</p>
          <div style={{display: 'flex', justifyContent:"space-around"}}>
          <Button onClick={confirmDelete} name='yes'/>
          <Button onClick={closeDeleteConfirmation} name='No' style={buttonDelete}/>
          </div>
        </div>
        </div>
      )}

      {isPopupOpen && (
        <AddNewPosts
          data={data}
          setData={setData}
          setIsNewPopupOpen={() => setIsPopupOpen(false )}
          isOpen={isPopupOpen}
          users={users}
         
        />
      )}
    </div>
  );
};

export default Posts;
