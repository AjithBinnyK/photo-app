import React, { useState } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    const formData = {
      file: selectedFile,
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    console.log('Form Data Ready to Send:', formData);
    // TODO: Send to backend or S3
  };

  return (
    <div className="upload-container">
    <h2>📷 Upload a Photo</h2>
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" style={{ width: '100%', borderRadius: 8 }} />
        </div>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit" disabled={!selectedFile}>Upload</button>
    </form>
  </div>
  );
}

export default ImageUploader;
