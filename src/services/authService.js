// src/services/authService.js

export async function loginRequest(email, password) {
  console.log("Attempt login with "+ email + " "+password);
  
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
export async function registerRequest(email, password , username) {
  const response = await fetch("http://localhost:8000/api/users/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password , username }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  return data;
  // return { data, status: response.status };
  
}

export async function changePassword(params) {
  
}
export async function requestPasswordReset(params) {
  
}

export async function createProfile(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/users/create-profile/", {
    method: "POST",
    headers: { "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
     },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Profile creation failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  

  return data;
}
export async function updateProfile(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }

  const response = await fetch("http://localhost:8000/api/users/my-profile/", {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Updating failed: ${errorText}`);
  }

  const data = await response.json();
  return { data, status: response.status };
}
export async function deleteProfile() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/users/leave-student-union/", {
    method: "POST",
    headers: { "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
     },
    // body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Profile creation failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  

  return data;
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
export async function getBoardMembers(language) {
  
  const response = await fetch(`http://localhost:8000/api/users/board-members?lang=${language}`);

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
export async function getPostsById(id) {
  
  const response = await fetch(`http://localhost:8000/api/news/posts/${id}`);

  if (!response.ok) {
    throw new Error("unable to get news");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}
//Admin
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
export async function getUsersProfiles_id(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://localhost:8000/api/users/admin/profiles/${id}`, {
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
    throw new Error("unable to get airport requests");
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
    throw new Error(`unable to get airport request for ${id}`);
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function updataAirportPickipRequestsById_Admin(id, data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/forms/admin/airport-pickup-forms/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
      body: JSON.stringify(data),
    })

  if (!response.ok) {
    throw new Error(`unable to get airport request for ${id}`);
  }

  
  const d = await response.json();
  // console.log(data);
  return d;
}

export async function updataEventId_Admin(id, data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/news/admin/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
      body: JSON.stringify(data),
    })

  if (!response.ok) {
    throw new Error(`unable to update Event ${id}`);
  }

  
  const d = await response.json();
  return d;
}

export async function deleteEvent_Admin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/news/admin/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error(`unable to Delete Event ${id}`);
  }

  
  if (response.status === 204) {
    return true;
  }
}

export async function createEvent_Admin(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/news/admin/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
      body: JSON.stringify(data),
    })

  if (!response.ok) {
    throw new Error(`unable to creete Event `);
  }

  
  const d = await response.json();
  return d;
}


export async function updataPostId_Admin(id, data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/news/admin/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
      body: JSON.stringify(data),
    })

  if (!response.ok) {
    throw new Error(`unable to update Post ${id}`);
  }

  
  const d = await response.json();
  return d;
}

export async function deletePost_Admin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/news/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error(`unable to Delete Post ${id}`);
  }

  
  if (response.status === 204) {
    return true;
  }
}

export async function createPost_Admin(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/news/admin/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`,
      },
      body: JSON.stringify(data),
    })

  if (!response.ok) {
    throw new Error(`unable to creete Post`);
  }

  
  const d = await response.json();
  return d;
}

export async function getMyProfile() {
  
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(`http://127.0.0.1:8000/api/users/my-profile`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
  })

  if (!response.ok) {
    throw new Error("unable to get my-profile");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  console.log(data);
  return data[0];
}


export async function airportPickupRequest( body) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/forms/my-airport-pickup-forms/", {
    method: "POST",
    headers: { "Content-Type": "application/json",
       "Authorization": `JWT ${token}`
     },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Airport Request failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  

  return data;
}


export async function guidenceRequest( body) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch("http://localhost:8000/api/forms/guidance-apply/", {
    method: "POST",
    headers: { "Content-Type": "application/json",
       "Authorization": `JWT ${token}`
     },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Guidence Request failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  

  return data;
}

const API_BASE = "http://localhost:8000/api/forms";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", Authorization: `JWT ${token}` };
}

// List user's forms
export async function getMyAirportPickupForms() {
  const res = await fetch(`${API_BASE}/my-airport-pickup-forms/`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load forms");
  return await res.json();
}

// Get one form by id
export async function getAirportPickupForm(id) {
  const res = await fetch(`${API_BASE}/my-airport-pickup-forms/${id}/`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load form");
  return await res.json();
}

// Create new form
export async function createAirportPickupForm(data) {
  const res = await fetch(`${API_BASE}/my-airport-pickup-forms/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({detail:  res.text()}));
    throw new Error(err.detail || "Create failed");
  }
  return await res.json();
}

// Update (PATCH)
export async function updateAirportPickupForm(id, data) {
  const res = await fetch(`${API_BASE}/my-airport-pickup-forms/${id}/`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({detail:  res.text()}));
    throw new Error(err.detail || "Update failed");
  }
  return await res.json();
}

// Delete
export async function deleteAirportPickupForm(id) {
  const res = await fetch(`${API_BASE}/my-airport-pickup-forms/${id}/`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
  return true;
}
