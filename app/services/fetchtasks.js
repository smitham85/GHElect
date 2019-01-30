export const getTasks = () => {
  const URL = `https://localhost:8081/api/tasks`;
  return fetch(URL).then(res => res.json());
};
