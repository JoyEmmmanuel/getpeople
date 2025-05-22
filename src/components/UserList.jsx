import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const USER_API = 'https://randomuser.me/api/?results=12';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState('all'); // all, male, female
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    fetch(USER_API)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setUsers(data.results);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    genderFilter === 'all'
      ? users
      : users.filter((user) => user.gender === genderFilter);

  return (
    <section aria-label="User list section">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
        {/* Gender filter */}
        <div className="flex items-center space-x-4" role="radiogroup" aria-label="Filter users by gender">
          <label>
            <input
              type="radio"
              name="gender"
              value="all"
              checked={genderFilter === 'all'}
              onChange={() => setGenderFilter('all')}
              className="mr-1"
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={genderFilter === 'male'}
              onChange={() => setGenderFilter('male')}
              className="mr-1"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={genderFilter === 'female'}
              onChange={() => setGenderFilter('female')}
              className="mr-1"
            />
            Female
          </label>
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchUsers}
          aria-label="Refresh user list"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div
          className="flex justify-center items-center py-10"
          role="status"
          aria-live="polite"
          aria-label="Loading users"
        >
          <svg
            className="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="text-red-600 text-center mb-4"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {/* User grid */}
      {!loading && !error && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          aria-live="polite"
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user.login.uuid} user={user} />
            ))
          ) : (
            <p className="text-center col-span-full">No users found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default UserList;
