import axios from './axios';

const basePath = '/phoneNumber';

export const fetchAllPhoneNumbers = () => axios
.get(basePath).then(response => response.data);

export const addPhoneNumber = entry => axios
.post(basePath, entry).then(response => response.data);

export const updatePhoneNumber = entry => axios
.put(`${basePath}/${entry.id}`, entry)
.then(response => response.data);

export const deletePhoneNumber = id => axios
.delete(`${basePath}/${id}`)
.then(response => response.data);