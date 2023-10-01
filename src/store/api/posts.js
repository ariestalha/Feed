const SERVER_URL = process.env.REACT_APP_API_ENDPOINT;

const fetchUsers = async (queryKey) => {
  const response = await fetch(
    `${SERVER_URL}/api/post/getAll?resident=${queryKey[1]}&apartment=${queryKey[2]}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export { fetchUsers };
