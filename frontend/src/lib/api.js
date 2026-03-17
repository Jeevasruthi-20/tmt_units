const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Measurement API
export const submitMeasurementOrder = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/measurements/submit`, {
    method: 'POST',
    body: formData, // No headers needed for FormData
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit measurement order');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 100)}`);
    }
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
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit enrollment');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 50)}...`);
    }
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
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit contact request');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 50)}...`);
    }
  }

  return response.json();
};

export const fetchEnrollments = async () => {
  const response = await fetch(`${API_BASE_URL}/classes/all`);

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch enrollments');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 50)}...`);
    }
  }

  return response.json();
};

export const fetchMeasurements = async () => {
  const response = await fetch(`${API_BASE_URL}/measurements/all`);

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch measurements');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 50)}...`);
    }
  }

  return response.json();
};

export const updateMeasurementStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/measurements/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update measurement status');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 50)}... [URL: ${API_BASE_URL}/measurements/${id}/status]`);
    }
  }

  return response.json();
};

export const updateEnrollmentStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/classes/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update enrollment status');
    } else {
        const text = await response.text();
        throw new Error(`Server returned ${response.status}: ${text.slice(0, 50)}... [URL: ${API_BASE_URL}/classes/${id}/status]`);
    }
  }

  return response.json();
};
