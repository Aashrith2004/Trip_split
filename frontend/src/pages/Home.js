import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Users, DollarSign, Calendar, ArrowRight, MapPin } from 'lucide-react';
import api from '../config/axios';
import toast from 'react-hot-toast';

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await api.get('/api/trips');
      setTrips(response.data);
    } catch (error) {
      toast.error('Failed to load trips');
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add delete handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this trip?')) return;
    try {
      await api.delete(`/api/trips/${id}`);
      toast.success('Trip deleted!');
      fetchTrips();
    } catch (error) {
      toast.error('Failed to delete trip');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Split Expenses with{' '}
          <span className="gradient-text">Friends</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track shared expenses, calculate balances, and settle up easily. 
          Perfect for trips, roommates, and group activities.
        </p>
        <Link to="/create">
          <motion.button
            className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-5 w-5" />
            <span>Create New Trip</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Trips Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Trips</h2>
          <div className="text-sm text-gray-500">
            {trips.length} trip{trips.length !== 1 ? 's' : ''}
          </div>
        </div>

        {trips.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            variants={itemVariants}
          >
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first trip to start splitting expenses with friends and family.
              </p>
              <Link to="/create">
                <button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Trip
                </button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <motion.div
                key={trip._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative">
                  <Link to={`/trip/${trip._id}`}>
                    <div className="card group-hover:shadow-glow cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {trip.name}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{trip.participants.length} participant{trip.participants.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>
                            {trip.expenses.length} expense{trip.expenses.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(trip.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {trip.expenses.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            Total: ${trip.expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow transition-colors z-10"
                    title="Delete trip"
                  >
                    &#10005;
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home; 