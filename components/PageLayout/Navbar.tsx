import Divider from "../Misc/Divider";

export default function Navbar() {
    return <div className="fixed w-full">
        <div className="p-2.5 flex items-center relative">
            <div className="p-1 h-stack">
                <h2 className="text-2xl font-semibold">CSCI 0111</h2>
            </div>
        </div>
        <Divider className="my-2"/>
    </div>
}