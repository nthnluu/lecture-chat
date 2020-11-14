import Divider from "../Misc/Divider";
import NavbarButtons from "./NavbarButtons";

export default function Navbar({onOpenSidebar, buttons, title}) {
    return <div className="w-full bg-white relative">
        <div className="default-padding flex w-full justify-between items-center w-full">
            <div className="p-1 h-stack w-auto overflow-hidden">
                <button className="mr-2 inline lg:hidden p-1.5 hover:bg-gray-100 focus:bg-gray-100 rounded-lg" onClick={onOpenSidebar}>
                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold truncate">{title}</h2>
            </div>
            <NavbarButtons buttons={buttons}/>
        </div>
        <Divider className="mt-2"/>
    </div>
}