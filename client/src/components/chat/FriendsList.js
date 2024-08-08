import React from 'react';
import { useAuthStore } from '../../container/auth.store';


function FriendsList({ friends, selectedFriend, onSelectFriend, onLogout }) {
    const getProfilePicUrl = (gender) => {
        // Replace these URLs with actual image URLs or paths to images
        return gender === 'male'
            ? 'https://avatar.iran.liara.run/public/boy'
            : 'https://avatar.iran.liara.run/public/girl';
    };

    const { logout } = useAuthStore((state) => ({
        logout: state.logout,
    }));

    return (
        <div className="relative md:w-1/4 w-full bg-gray-100 p-4 border-b md:border-r border-gray-300 overflow-y-auto md:border-b-0 h-screen">
            <h2 className="text-xl font-semibold mb-4">Friends</h2>
            <ul>
                {friends.map(({ name, gender }) => (
                    <li
                        key={name}
                        className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${selectedFriend === name ? 'bg-gray-300' : ''}`}
                        onClick={() => onSelectFriend(name)}
                    >
                        <img
                            src={getProfilePicUrl(gender)}
                            alt={`${name}'s profile`}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        {name}
                    </li>
                ))}
            </ul>
            <button
                onClick={logout}
                className="absolute bottom-3 w-1/4 bg-red-500 text-white py-2 rounded-t hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Logout
            </button>
        </div>
    );
}

export default FriendsList;
