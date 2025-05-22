import React from 'react';

const UserCard = ({ user }) => {
  const {
    picture: { large: pictureUrl },
    name: { title, first, last },
    email,
    location: { city, country },
    gender,
  } = user;

  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center text-center"
      aria-label={`User card for ${first} ${last}`}
    >
      <img
        src={pictureUrl}
        alt={`Profile of ${first} ${last}`}
        className="rounded-full w-24 h-24 mb-4"
        loading="lazy"
      />
      <h2 className="text-lg font-semibold">{`${title} ${first} ${last}`}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
      <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{`${city}, ${country}`}</p>
      <p className="mt-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-700 rounded-full text-indigo-800 dark:text-indigo-200 text-xs uppercase font-semibold">
        {gender}
      </p>
    </article>
  );
};

export default UserCard;
