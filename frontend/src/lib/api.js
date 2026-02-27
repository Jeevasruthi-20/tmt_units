const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Measurement API
export const submitMeasurementOrder = async (order) => {
  const response = await fetch(`${API_BASE_URL}/measurements/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit measurement order');
  }

  return response.json();
};

// Class Enrollment API
export const submitOnlineClassEnrollment = async (enrollment) => {
  const response = await fetch(`${API_BASE_URL}/classes/online`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollment),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit enrollment');
  }

  return response.json();
};

export const submitOfflineClassContact = async (contact) => {
  const response = await fetch(`${API_BASE_URL}/classes/offline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit contact request');
  }

  return response.json();
};

export const fetchEnrollments = async () => {
  const response = await fetch(`${API_BASE_URL}/classes/all`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch enrollments');
  }

  return response.json();
};
