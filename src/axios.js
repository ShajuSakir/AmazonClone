import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/challenge-d0cb1/us-central1/api", //url (cloud function ) of our API
});

export default instance;
