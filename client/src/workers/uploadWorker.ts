self.onmessage = async (event) => {
  const { file, uploadURL, uploadParams } = event.data;

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadURL, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 100);
        self.postMessage({ progress });
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        self.postMessage({ success: true, url: response.secure_url });
      } else {
        self.postMessage({ success: false });
      }
    };

    xhr.onerror = () => {
      self.postMessage({ success: false });
    };
    console.log(uploadParams);

    const formData = new FormData();
    formData.append('api_key', uploadParams.apiKey);
    formData.append('timestamp', uploadParams.timestamp);
    formData.append('signature', uploadParams.signature);
    formData.append('folder', uploadParams.folder);
    formData.append('file', file);
    xhr.send(formData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    self.postMessage({ success: false });
  }
};
