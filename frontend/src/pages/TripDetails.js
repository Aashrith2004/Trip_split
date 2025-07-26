import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Plus, DollarSign, Users, Calculator, 
  Edit3, Trash2, User, TrendingUp, TrendingDown,
  CheckCircle, AlertCircle, Info
} from 'lucide-react';
import api from '../config/axios';
import toast from 'react-hot-toast';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: ''
  });

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      const [tripResponse, balancesResponse] = await Promise.all([
        api.get(`/api/trips/${id}`),
        api.get(`/api/trips/${id}/balances`)
      ]);
      setTrip(tripResponse.data);
      setBalances(balancesResponse.data);
    } catch (error) {
      toast.error('Failed to load trip details');
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    
    if (!newExpense.description || !newExpense.amount || !newExpense.paidBy) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await api.post(`/api/trips/${id}/expenses`, newExpense);
      toast.success('Expense added successfully!');
      setNewExpense({ description: '', amount: '', paidBy: '' });
      setShowAddExpense(false);
      fetchTripDetails();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add expense');
    }
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    
    if (!editingExpense.description || !editingExpense.amount || !editingExpense.paidBy) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await api.put(`/api/trips/${id}/expenses/${editingExpense.index}`, {
        description: editingExpense.description,
        amount: editingExpense.amount,
        paidBy: editingExpense.paidBy
      });
      toast.success('Expense updated successfully!');
      setEditingExpense(null);
      fetchTripDetails();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update expense');
    }
  };

  const handleDeleteExpense = async (index) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/api/trips/${id}/expenses/${index}`);
        toast.success('Expense deleted successfully!');
        fetchTripDetails();
      } catch (error) {
        toast.error('Failed to delete expense');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to trips
        </button>
      </div>
    );
  }

  const totalExpenses = trip.expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.name}</h1>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {trip.participants.length} participants
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {trip.expenses.length} expenses
              </div>
              <div className="flex items-center">
                <Calculator className="h-4 w-4 mr-1" />
                Total: ${totalExpenses.toFixed(2)}
              </div>
            </div>
          </div>
          
          <motion.button
            onClick={() => setShowAddExpense(true)}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-4 w-4" />
            <span>Add Expense</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expenses List */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expenses</h2>
            
            {trip.expenses.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No expenses yet</p>
                <button
                  onClick={() => setShowAddExpense(true)}
                  className="btn-outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Expense
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {trip.expenses.map((expense, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{expense.description}</h3>
                      <p className="text-sm text-gray-600">Paid by {expense.paidBy}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setEditingExpense({ ...expense, index })}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(index)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Participants */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
            <div className="space-y-2">
              {trip.participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{participant}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Balances */}
          {balances && (
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Balances</h3>
              <div className="space-y-3">
                {Object.entries(balances.balances).map(([name, balance]) => (
                  <div key={name} className="flex items-center justify-between">
                    <span className="text-gray-700">{name}</span>
                    <div className={`flex items-center space-x-1 ${
                      balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {balance > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : balance < 0 ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {balance > 0 ? '+' : ''}${balance.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total spent:</span>
                  <span className="font-medium">${balances.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fair share:</span>
                  <span className="font-medium">${balances.fairShare.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showAddExpense && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Expense</h3>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Dinner, Gas, Hotel"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="input-field"
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid by
                  </label>
                  <select
                    value={newExpense.paidBy}
                    onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select participant</option>
                    {trip.participants.map((participant) => (
                      <option key={participant} value={participant}>
                        {participant}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddExpense(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Add Expense
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Expense Modal */}
      <AnimatePresence>
        {editingExpense && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Expense</h3>
              <form onSubmit={handleUpdateExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingExpense.description}
                    onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingExpense.amount}
                    onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Paid by
                  </label>
                  <select
                    value={editingExpense.paidBy}
                    onChange={(e) => setEditingExpense({ ...editingExpense, paidBy: e.target.value })}
                    className="input-field"
                    required
                  >
                    {trip.participants.map((participant) => (
                      <option key={participant} value={participant}>
                        {participant}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingExpense(null)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Update Expense
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripDetails; 