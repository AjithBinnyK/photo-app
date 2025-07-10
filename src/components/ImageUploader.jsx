import React, { useState, useRef  } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    const fileName = `${Date.now()}_${selectedFile.name}`;
    const fileType = selectedFile.type;

    try {
      const res = await fetch(
        `http://localhost:4000/generate-upload-url?filename=${fileName}&contentType=${fileType}`
      );
      const { uploadURL, key } = await res.json();

      await fetch(uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: selectedFile,
      });

      const formData = {
        title,
        description,
        tags: tags.split(',').map((tag) => tag.trim()),
        s3Key: key,
      };

      console.log('✅ Image uploaded successfully');
      console.log('📝 Metadata:', formData);

      alert('✅ Uploaded and metadata saved (in console for now)');
      setSelectedFile(null);
      setPreviewUrl('');
      fileInputRef.current.value = '';
      setTitle('');
      setDescription('');
      setTags('');
    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert('Upload failed');
    }
  };


  return (
    <div className="upload-container">
    <h2>📷 Upload a Photo</h2>
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef}/>

      {previewUrl && (
        <div style={{ margin: '10px 0', position: 'relative' }}>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%',maxHeight: 250, borderRadius: 8 }} />
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null);
              setPreviewUrl('');
              fileInputRef.current.value = '';
            }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            ✖ Remove
          </button>
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
