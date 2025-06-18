import React, { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';

export default function UploadPhoto({ onUploadComplete }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState('');

  const handleClick = () => {
    if (!uploading) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setError('');
    const uploaded = [];

    for (const file of selectedFiles) {
      try {
        const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        uploaded.push({ name: file.name, url });
      } catch (err) {
        console.error(err);
        setError('One or more files failed to upload.');
      }
    }

    setUploadedFiles((prev) => [...prev, ...uploaded]);

    if (onUploadComplete) {
      onUploadComplete(uploaded);
    }

    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        disabled={uploading}
        className="p-2 sm:p-3 rounded-lg border text-center text-xs sm:text-sm border-gray-300 text-gray-700 hover:border-gray-400"
      >
        {uploading ? 'Uploading...' : 'Upload Photos'}
      </button>
      {uploadedFiles.length > 0 && (
        <div className="text-sm text-gray-700 space-y-1">
          <p>{uploadedFiles.length} photo{uploadedFiles.length > 1 ? 's' : ''} uploaded:</p>
          <ul className="list-disc list-inside">
            {uploadedFiles.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}