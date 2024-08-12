import { LuMessagesSquare } from "react-icons/lu";
import { SiWelcometothejungle } from "react-icons/si";
import { useAuthStore } from "../container/auth.store";


const NoChatSelectedPage = () => {

    const { user } = useAuthStore((state) => ({
        user: state.user,
    }));

    const name = user?.fullName;

    return (
        <div className="flex flex-col  items-center justify-center h-screen">
            <h1 className="text-4xl font-bold flex"><SiWelcometothejungle className="text-6xl" />elcome, 👋 {name}!</h1>
            <p className="text-xl mt-4">Select a chat to start messaging.</p>
            <LuMessagesSquare className="text-6xl mt-7" />
        </div>
    );
};

export default NoChatSelectedPage;