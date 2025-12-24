import React from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import { format } from 'date-fns';

const MyProfile = () => {
  const { user } = useAuth();
  const joinDate = user?.metadata?.creationTime 
    ? format(new Date(user.metadata.creationTime), 'MMMM dd, yyyy')
    : 'N/A';

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-base-100 to-base-200">
         <title>DecorNest-Dashboard-My Profile</title>
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-primary py-12 px-8 text-center">
            <div className="avatar mx-auto mb-6">
              <div className="w-40 h-40 rounded-full ring ring-offset-8 ring-offset-base-100 ring-primary ring-offset-2 shadow-xl">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/default-avatar.jpg'}
                  alt={user?.displayName || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {user?.displayName || 'Your Name'}
            </h2>
          </div>

          {/* Profile Details */}
          <div className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 dark:bg-gray-700 p-6 rounded-xl text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Email</p>
                <p className="text-xl font-semibold text-primary">{user?.email || 'N/A'}</p>
              </div>
              <div className="bg-base-200 dark:bg-gray-700 p-6 rounded-xl text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Joined On</p>
                <p className="text-xl font-semibold text-primary">{joinDate}</p>
              </div>
            </div>

            {/* Simple Footer Info */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Account Type: {user?.emailVerified ? 'Verified' : 'Unverified'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyProfile;