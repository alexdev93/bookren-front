const checkAuth = async (axios) => {
    
  const token = localStorage.get("token");

  if (!token) {
    console.log("No token found in sessionStorage");
    return false;
  }

  try {
    const response = await axios.get(`/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      console.log("Response sttatus - ", response.status);
    }

    const data = response.data;
    if (data) {
      return true;
    } else {
      console.log("Token verification response invalid");
    }
  } catch (err) {
    console.error("Token verification error:", err);
    localStorage.remove("token");
    return false;
  }
};

export const checkIfAuthenticate = checkAuth();
