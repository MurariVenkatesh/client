import React, { useEffect, useState } from 'react';
import { FaHeart, FaShareAlt, FaCommentDots, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './blog.css'; // Import the CSS file

const DisplayPage = () => {
    const [files, setFiles] = useState([]);
    const [currentFileId, setCurrentFileId] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showCommentsModal, setShowCommentsModal] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get-files');
                const data = await response.json();
                setFiles(data.files);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    const handleLike = async (fileId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/toggle-like/${fileId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update likes');
            }

            const data = await response.json();
            console.log('Updated likes:', data.likes);
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    const fetchComments = async (fileId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/get-comments/${fileId}`);
            const data = await response.json();
            setComments(data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentClick = (fileId) => {
        setCurrentFileId(fileId);
        fetchComments(fileId);
        setShowCommentsModal(true);
    };

    const handleCloseModal = () => {
        setShowCommentsModal(false);
        setComments([]);
        setNewComment('');
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/add-comment/${currentFileId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const data = await response.json();
            setComments(data.comments); // Refresh comments with the newly added comment
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="container">
            <h1>Uploaded Files</h1>
            <div className="file-grid">
                {files.map((file) => (
                    <div key={file._id} className="file-item">
                        {file.type === 'image' ? (
                            <img src={file.url} alt={file.fileName} />
                        ) : (
                            <video src={file.url} controls>
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <div className="overlay">
                            <div className="overlay-actions">
                                <button onClick={() => handleLike(file._id)}>
                                    <FaHeart /> {file.likes}
                                </button>
                                <button onClick={() => handleCommentClick(file._id)}>
                                    <FaCommentDots />
                                </button>
                                <button>
                                    <FaShareAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showCommentsModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}>
                            <FaTimes />
                        </button>
                        <h2>Comments</h2>
                        <div className="comments-list">
                            {comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    {comment}
                                </div>
                            ))}
                        </div>
                        <div className="comment-input-container">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment"
                            />
                            <button className="send-button" onClick={handleCommentSubmit}>
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayPage;
