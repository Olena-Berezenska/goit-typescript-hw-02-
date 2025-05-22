import axios from 'axios';

export const fetchPicts = async (query, page, signal) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=LuepmMpZQMd5frTiCtg7LqF1QR3QB5891j3E4PGkH0s&query=${query}&page=${page}`,
    { signal }
  );
  console.log('API Response:', response.data);
  return response.data;
};
