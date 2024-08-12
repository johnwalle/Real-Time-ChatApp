import { useEffect, useState } from 'react';
import { useAuthStore } from '../../container/auth.store';
import { useUserStore } from '../../container/user.store';

function FriendsList({ selectedFriend, onSelectFriend }) {
    const { user, logout } = useAuthStore((state) => ({
        logout: state.logout,
        user: state.user
    }));

    const { friends, fetchFriends } = useUserStore(state => ({
        friends: state.friends,
        fetchFriends: state.fetchFriends
    }));

    const [isLoading, setIsLoading] = useState(false);
    const token = user?.token;

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            fetchFriends(token)
                .finally(() => setIsLoading(false));
        }
    }, [token, fetchFriends]);

    return (
        <div className="relative md:w-1/4 w-full bg-gray-100 p-4 border-b md:border-r border-gray-300 overflow-y-auto md:border-b-0 h-screen">
            <h2 className="text-xl font-semibold mb-4">Friends</h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-full">
                    Loading...
                </div>
            ) : (
                <ul>
                    {friends.map(({ _id, fullName, avatar }) => (
                        <li
                            key={_id}
                            className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${selectedFriend === _id ? 'bg-gray-300' : ''}`}
                            onClick={() => onSelectFriend(_id)}
                        >
                            <img
                                src={avatar}
                                alt={`${fullName}'s profile`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            {fullName}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={logout}
                className="absolute bottom-3 w-1/4 bg-red-500 text-white py-2 rounded-t hover:bg-red-600 focus:outline-line focus:ring-2 focus:ring-red-500"
            >
                Logout
            </button>
        </div>
    );
}

export default FriendsList;