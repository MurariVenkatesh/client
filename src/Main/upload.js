import React, { useState } from 'react';
import { storage } from '../Home/firebase'; // Import the Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // For unique file names

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        // Check if the file is an image or video
        const validTypes = ['image/jpeg', 'image/png', 'video/mp4'];
        if (!validTypes.includes(selectedFile.type)) {
            alert('Wrong format. Only JPEG, PNG images, and MP4 videos are allowed.');
            setFile(null);
            return;
        }

        // Check for video file size and duration
        if (selectedFile.type === 'video/mp4') {
            const videoSizeMB = selectedFile.size / (1024 * 1024);
            if (videoSizeMB > 5) {
                alert('Video file size should be less than 5MB.');
                setFile(null);
                return;
            }

            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                const duration = video.duration;
                if (duration > 300) { // 300 seconds = 5 minutes
                    alert('Video duration should be less than 5 minutes.');
                    setFile(null);
                } else {
                    setFile(selectedFile);
                }
            };

            video.src = URL.createObjectURL(selectedFile);
        } else {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        setUploading(true);
        try {
            // Create a unique file name
            const fileRef = ref(storage, `uploads/${uuidv4()}_${file.name}`);

            // Upload file
            await uploadBytes(fileRef, file);

            // Get the file URL
            const url = await getDownloadURL(fileRef);

            // Send URL to backend to store in MongoDB
            const response = await fetch('http://localhost:8000/api/upload-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, fileName: file.name, type: file.type })
            });

            if (response.ok) {
                alert('File uploaded successfully');
            } else {
                alert('Failed to upload file to the database.');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Upload Photo or Video</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading} style={{ color: "black" }}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadPage;
