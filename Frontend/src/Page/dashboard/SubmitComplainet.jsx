import React, { useState } from "react";
import API from "../../api/axios";
const SubmitComplaint = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation not supported.");
      return;
    }

    setLocationStatus("Detecting location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationStatus("Location captured successfully.");
      },
      () => {
        setLocationStatus("Location permission denied.");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);
      if (latitude) formData.append("latitude", latitude);
      if (longitude) formData.append("longitude", longitude);

      await API.post("/complain/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Complaint submitted successfully.");
      setTitle("");
      setDescription("");
      setImage(null);
      setLatitude(null);
      setLongitude(null);
      setLocationStatus("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl md:mt-0 mt-8 mx-auto bg-white border rounded-xl shadow-sm p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Submit Complaint
        </h2>
        <p className="text-sm text-gray-700 mt-2">
          Report civic issues such as damaged roads, waste management problems,
          streetlight failures, or water leakage. Provide accurate details to
          assist authorities in resolving the issue efficiently.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complaint Title
          </label>
          <input
            type="text"
            placeholder="Enter a short title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows="5"
            placeholder="Provide detailed information about the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image (Optional)
          </label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-600">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>

          <button
            type="button"
            onClick={handleGetLocation}
            className="px-4 py-2 text-sm border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition"
          >
            Use Current Location
          </button>

          {locationStatus && (
            <p className="text-xs text-gray-600 mt-2">{locationStatus}</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
