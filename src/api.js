const API_URL = 'http://localhost:3000';

export const fetchFilesApi = async () => {
  try {
    const response = await fetch(`${API_URL}/list`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const scanDirectoryApi = async (directoryPath) => {
  try {
    const response = await fetch(`${API_URL}/scan?path=${directoryPath}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const downloadStateApi = async () => {
  try {
    const response = await fetch(`${API_URL}/download-state`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file_state.json');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
