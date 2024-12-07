import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 cursor-pointer transition-all duration-200 
        ${isDragActive ? 'border-black bg-gray-300' : 'border-gray-300 bg-gray-50 hover:bg-gray-200'}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-black font-semibold">Drop the files here...</p>
      ) : (
        <p className="text-gray-500">
          Drag & drop files here, or{' '}
          <span className="text-black font-semibold">
            click to select files
          </span>
        </p>
      )}
    </div>
  );
};

export default Dropzone;
