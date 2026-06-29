import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/superadmindashboard/dashboard";
import AddEvent from "./pages/add-event/add-event";
import EventList from "./pages/event-list/event-list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event-list" element={<EventList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;