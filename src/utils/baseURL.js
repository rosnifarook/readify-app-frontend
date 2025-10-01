const getBaseUrl = () => {
  return (
    window?.configs?.apiUrl || import.meta.env.VITE_BASE_URL || "http://localhost:5000"
  );
};

export default getBaseUrl;