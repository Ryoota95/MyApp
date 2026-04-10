import Sidebar from "../component/sidebar";
import RightPanel from "../component/rightpanel";

export default function Mainlayout ({children}: {children: React.ReactNode}) {
    return (
        <div className="flex h-screen bg-black text-white">
            <Sidebar/>
            <div className="flex-1 border-x border-gray-800 overflow-y-auto">{children}</div>
                <RightPanel/>
            
        </div>
    )
}