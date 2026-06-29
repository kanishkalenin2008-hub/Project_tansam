const BASE_URL = "http://localhost:3002";

/* =========================
   AUTH - LOGIN
========================= */
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Login Error:", error);
    return { message: "Server error" };
  }
};

/* =========================
   EVENTS - GET ALL
========================= */
export const getEvents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/events`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Get Events Error:", error);
    return [];
  }
};

/* =========================
   EVENTS - ADD
========================= */
export const addEvent = async (eventData) => {
  try {
    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Add Event Error:", error);
    return { success: false };
  }
};

/* =========================
   EVENTS - DELETE
========================= */
export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/events/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      return { success: false };
    }

    return { success: true };

  } catch (error) {
    console.log("Delete Event Error:", error);
    return { success: false };
  }
};

/* =========================
   USERS - REGISTER (if needed later)
========================= */
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.log("Register Error:", error);
    return { message: "Server error" };
  }
};