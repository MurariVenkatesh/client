import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userdetails.css';
import ChatBox from './chat';

const UserDetailsPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser] = useState({ _id: 'currentUserId' }); // Replace with actual current user ID

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log('Fetching users...');
                const response = await axios.get('http://localhost:8000/api/users');
                console.log('Users fetched:', response.data);

                setUsers(response.data);
                setFilteredUsers(response.data); // Initially show all users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term) {
            // Separate matched and unmatched users
            const matchedUsers = users.filter(user =>
                user.username && user.username.toLowerCase().includes(term)
            );
            const unmatchedUsers = users.filter(user =>
                !user.username || !user.username.toLowerCase().includes(term)
            );

            // Combine matched users at the top with unmatched users below
            const sortedUsers = [...matchedUsers, ...unmatchedUsers];
            setFilteredUsers(sortedUsers);
        } else {
            // Reset the filtered users when search term is cleared
            setFilteredUsers(users);
        }
    };

    return (
        <div className="user-details-page">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div
                            key={user._id}
                            className="user-item"
                            style={index === 0 && searchTerm ? { border: '2px solid #4CAF50', marginBottom: '10px' } : {}}
                            onClick={() => setSelectedUser(user)}
                        >
                            <img
                                src={user.profilePic || 'default-profile-pic.jpg'}
                                alt={user.username || 'default'}
                                className="profile-pic"
                            />
                            <div className="user-info">
                                <div className="username">{user.username || 'Unknown User'}</div>
                                <div className="bio">{user.bio || 'No bio available'}</div>
                            </div>
                            <div className={`status ${user.active ? 'active' : 'inactive'}`}>
                                {user.active ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No users found</div>
                )}
            </div>
            {selectedUser && (
                <ChatBox
                    currentUser={currentUser}
                    chatUser={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default UserDetailsPage;
