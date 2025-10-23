// src/services/authService.js

export async function loginRequest(email, password) {
  const response = await fetch("http://localhost:8000/api/users/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  // console.log("this is the data from login", data);
  
  const token = data.jwt;
  // console.log(typeof token);
  

  if (!token) {
    throw new Error("No token returned from login");
  }

  // Store token in localStorage for later use
  localStorage.setItem("token", token);

  // console.log("Token received:", token);
  // console.log("Token Type:", typeof token);

  return token;
}
export async function fetchUserRole() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/users/user-stat/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user role");
  }

  const data = await response.json();
  // console.log("User roles:", data);
  return data;
}


export async function logoutRequest() {
  // 1️⃣ First: send login credentials
  const response = await fetch("http://localhost:8000/api/users/logout/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }else{
    const res = await response.json()
    console.log(res.value);
    
  }
}


export async function getUniversities() {
  
  const response = await fetch("http://localhost:8000/api/users/universities");

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function getBoardMembers() {
  
  const response = await fetch("http://localhost:8000/api/users/board-members");

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}


export async function getEvents() {
  
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/news/events", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
  })

  if (!response.ok) {
    throw new Error("unable to get events");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function getPosts() {
  
  const response = await fetch("http://localhost:8000/api/news/posts");

  if (!response.ok) {
    throw new Error("unable to get news");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/users/admin/users/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getUsersProfiles() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/users/admin/profiles/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}



export async function getBoardMembers_Admin() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/users/admin/board-members/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}


export async function getMembershipRequests_Admin() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://127.0.0.1:8000/api/forms/admin/membership-forms/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function getMembershipRequestsById_Admin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/forms/admin/membership-forms/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getAirportPickipRequests_Admin() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://127.0.0.1:8000/api/forms/admin/airport-pickup-forms/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}


export async function getAirportPickipRequestsById_Admin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/forms/admin/airport-pickup-forms/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}

