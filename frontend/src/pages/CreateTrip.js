import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, X, Users, MapPin, ArrowLeft } from 'lucide-react';
import api from '../config/axios';
import toast from 'react-hot-toast';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    participants: ['']
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleParticipantChange = (index, value) => {
    const newParticipants = [...formData.participants];
    newParticipants[index] = value;
    setFormData({
      ...formData,
      participants: newParticipants
    });
  };

  const addParticipant = () => {
    setFormData({
      ...formData,
      participants: [...formData.participants, '']
    });
  };

  const removeParticipant = (index) => {
    if (formData.participants.length > 1) {
      const newParticipants = formData.participants.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        participants: newParticipants
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter a trip name');
      return;
    }

    const validParticipants = formData.participants.filter(p => p.trim() !== '');
    if (validParticipants.length === 0) {
      toast.error('Please add at least one participant');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/api/trips', {
        name: formData.name.trim(),
        participants: validParticipants
      });
      
      toast.success('Trip created successfully!');
      navigate(`/trip/${response.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to trips
        </button>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-4">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
          <p className="text-gray-600">Set up a new trip to start tracking shared expenses</p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Trip Name */}
        <div className="card">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Trip Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Summer Vacation 2024, Weekend Getaway"
            className="input-field"
            required
          />
        </div>

        {/* Participants */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Participants *
            </label>
            <button
              type="button"
              onClick={addParticipant}
              className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Participant
            </button>
          </div>
          
          <div className="space-y-3">
            {formData.participants.map((participant, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={participant}
                    onChange={(e) => handleParticipantChange(index, e.target.value)}
                    placeholder={`Participant ${index + 1} name`}
                    className="input-field"
                  />
                </div>
                {formData.participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mt-3">
            Add all the people who will be sharing expenses on this trip
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Trip...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 mr-2" />
              Create Trip
            </div>
          )}
        </motion.button>
      </motion.form>

      {/* Tips */}
      <motion.div
        className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for a great trip</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a descriptive name that everyone will recognize</li>
          <li>• Add all participants who will be sharing expenses</li>
          <li>• You can always add or remove participants later</li>
          <li>• Consider adding yourself as a participant</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default CreateTrip; 