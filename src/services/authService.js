// src/services/authService.js

const API_URL = import.meta.env.VITE_API_URL;

// Helper to add /api automatically
function api(path) {
  return `${API_URL}/api${path}`;
}

// Add this new function to your authService.js
export async function checkTokenValidity() {
  // This request should be made with the existing JWT in the header
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api("/users/chk-tkn/"), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // If the response is not OK (e.g., 401 Unauthorized), the token is invalid
    return 0; 
  }

  const data = await response.json();
  return data.remaining_seconds || 0;
}



export async function loginRequest(email, password) {
  console.log("Attempt login with "+ email + " "+password);
  
  const response = await fetch(api("/users/login/"), {
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
  const response = await fetch(api("/users/register/"), {
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
export async function resetPassword(uid, token, new_password) {
  const response = await fetch(
    api(`/users/reset-password/`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        token,
        new_password
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid or expired token");
  }

  return await response.json();
}
export async function changePassword(oldPass , newPass) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api("/users/change-password/"), {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
     },
    
    body: JSON.stringify({"old_password":oldPass, "new_password":newPass}),
  });

  if (!response.ok) {
    throw new Error("Changing password failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  return data;
}
export async function requestPasswordReset(email) {
  const response = await fetch(api("/users/forgot-password/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email}),
  });

  if (!response.ok) {
    throw new Error("Reset password failed");
  }
  console.log("response " + response);
  
  const data = await response.json();
  console.log("data "+data);
  return data;
}

export async function createProfile(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api("/users/create-profile/"), {
    method: "POST",
    headers: { "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
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

  const response = await fetch(api("/users/my-profile/"), {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
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
  const response = await fetch(api("/users/delete-my-account/"), {
    method: "POST",
    headers: { "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
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
  const response = await fetch(api("/users/user-stat/"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
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
  const response = await fetch(api("/users/logout/"), {
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
// Assume 'api' function is defined elsewhere to build the URL
// import { api } from "./utils"; 

export async function downloadRules() {
  const response = await fetch(api("/legal/regulations"));

  if (!response.ok) {
    // Throw error with status for better debugging
    throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
  }

  // 1️⃣ Get the binary file data as a Blob (Binary Large Object)
  const blob = await response.blob();

  // 2️⃣ Create a URL pointing to the Blob object
  const url = window.URL.createObjectURL(blob);

  // 3️⃣ Create a temporary anchor (<a>) element to trigger the download
  const link = document.createElement('a');
  link.href = url;
  
  // 4️⃣ Set the file name (you can use a default name or extract it from headers)
  // In a real application, check for the 'Content-Disposition' header for the filename.
  link.setAttribute('download', 'GUYSH_Regulations.pdf'); 
  
  // 5️⃣ Append link to body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  link.remove();
  
  // 6️⃣ Clean up the temporary URL object
  window.URL.revokeObjectURL(url);
}

export async function getActivateVersions() {
  
  const response = await fetch(api("/legal-active-versions/"));

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  const data = await response.json();
  
  return data;
}
export async function getAvailableService() {
  
  const response = await fetch(api("/available-services/"));

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  const data = await response.json();
  
  return data;
}

export async function getUniversities() {
  
  const response = await fetch(api("/users/universities/"));

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function getBoardMembers(language) {
  
  const response = await fetch(api(`/users/board-members?lang=${language}`));

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
  const response = await fetch(api("/news/events"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
export async function getPosts(language) {
  
  const response = await fetch(api(`/news/posts?lang=${language}`));

  if (!response.ok) {
    throw new Error("unable to get news");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function getPosts_Admin() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  
  const response = await fetch(api("/news/admin/posts"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
  })

  if (!response.ok) {
    throw new Error("unable to get news");
  }

  // 2️⃣ Get login response (likely contains token)
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function getPostsById(id, lang) {
  
  const response = await fetch(api(`/news/posts/${id}?lang=${lang}`));

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
  const response = await fetch(api("/users/admin/users/"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api("/users/admin/profiles/"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/users/admin/profiles/${id}`), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}


export async function getBoardMembers_Admin(language) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/users/admin/board-members?lang=${language}/`), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error("unable to get users");
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}


export async function getBoardMemberById_Admin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/users/admin/board-members/${id}`), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error(`unable to get membership request with id : ${id}`);
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}
export async function updateBoardMember_Admin(id, data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/users/admin/board-members/${id}/`), {
      method: "PATCH",
      headers: {
        "Authorization": `bearer ${token}`,
      },
      body: data,
    })

  if (!response.ok) {
    throw new Error(`unable to update board-member with id:  ${id}`);
  }

  
  const d = await response.json();
  // console.log(data);
  return d;
}
export async function createBoardMember_Admin(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/users/admin/board-members/`), {
      method: "POST",
      headers: {
        "Authorization": `bearer ${token}`,
      },
      body: data,
    })

  if (!response.ok) {
    throw new Error(`unable to create board-member `);
  }

  
  const d = await response.json();
  // console.log(data);
  return d;
}

export async function deleteBoardMember_Admin(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/users/admin/board-members/${id}/`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error(`unable to Delete Event ${id}`);
  }

  
  if (response.status === 204) {
    return true;
  }
}

export async function getMembershipRequests_Admin() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api("/forms/admin/membership-forms/"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/forms/admin/membership-forms/${id}`), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      }
    })

  if (!response.ok) {
    throw new Error(`unable to get membership request with id : ${id}`);
  }

  
  const data = await response.json();
  // console.log(data);
  return data;
}


export async function updataMembershipRequestsById_Admin(id, data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/forms/admin/membership-forms/${id}/`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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

export async function getAirportPickipRequests_Admin() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api("/forms/admin/airport-pickup-forms/"), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/forms/admin/airport-pickup-forms/${id}`), {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/forms/admin/airport-pickup-forms/${id}/`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/news/admin/events/${id}`), {
      method: "PATCH",
      headers: {
        "Authorization": `bearer ${token}`,
      },
      body: data,
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
  const response = await fetch(api(`/news/admin/events/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/news/admin/events/`), {
      method: "POST",
      headers: {
        "Authorization": `bearer ${token}`,
      },
      body: data,
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
  const response = await fetch(api(`/news/admin/posts/${id}`), {
      method: "PATCH",
      headers: {
        "Authorization": `bearer ${token}`,
      },
      body: data,
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
  const response = await fetch(api(`/news/admin/posts/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
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
  const response = await fetch(api(`/news/admin/posts/`), {
      method: "POST",
      headers: {
        "Authorization": `bearer ${token}`,
      },
      body: data,
    })

  if (!response.ok) {
    throw new Error(`unable to creete Post`);
  }

  
  const d = await response.json();
  return d;
}

export async function sendEmail_Admin(data) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api("/users/admin/send-email-notification/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

  if (!response.ok) {
    throw new Error(`unable to creete Event `);
  }

  
  const d = await response.json();
  return d;
}

export async function getMyProfile() {
  
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. User might not be logged in.");
  }
  const response = await fetch(api(`/users/my-profile`), {
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
  const response = await fetch(api("/forms/my-airport-pickup-forms/"), {
    method: "POST",
    headers: { "Content-Type": "application/json",
       "Authorization": `bearer ${token}`
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
  const response = await fetch(api("/forms/guidance-apply/"), {
    method: "POST",
    headers: { "Content-Type": "application/json",
       "Authorization": `bearer ${token}`
     },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Guidence Request failed");
  }
  
  const data = await response.json();
  console.log("data "+data);
  

  return data;
}
export async function verifyGuidanceEmail(uid, token) {
  const response = await fetch(
    api(`/forms/guidance-verify/${uid}/${token}/`),
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Invalid or expired token");
  }

  return await response.json();
}
export async function verifyEmail(uid, token) {
  const response = await fetch(
    api(`/users/verify-email/${uid}/${token}/`),
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Invalid or expired token");
  }

  return await response.json();
}

const API_BASE = "http://localhost:8000/api/forms";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", Authorization: `bearer ${token}` };
}

// List user's forms
export async function getMyAirportPickupForms() {
  const res = await fetch(api(`/forms/my-airport-pickup-forms/`), {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load forms");
  return await res.json();
}

// Get one form by id
export async function getAirportPickupForm(id) {
  const res = await fetch(api(`forms/my-airport-pickup-forms/${id}/`), {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to load form");
  return await res.json();
}

// Create new form
export async function createAirportPickupForm(data) {
  const res = await fetch(api(`forms/my-airport-pickup-forms/`), {
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
  const res = await fetch(api(`forms/my-airport-pickup-forms/${id}/`), {
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
  const res = await fetch(api(`forms/my-airport-pickup-forms/${id}/`), {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Delete failed");
  return true;
}
