import {useState} from "react";
import Link from "next/link";
import Spacer from "../Misc/Spacer";
import {Transition} from "@headlessui/react";
import AccountMenu from "./AccountMenu";
import NavbarButtons from "./NavbarButtons";

export default function Sidebar({config, mobile, isOpen, onClose = null, loading}) {
    const [expanded, toggleExpanded] = useState(true)
    const styles = {
        root: `${expanded ? "w-screen sm:w-100" : "w-96 lg:w-auto"} h-full lg:border-r shadow-2xl 
        lg:shadow-none border-gray-200 bg-white z-50 shadow-sm default-padding flex flex-col absolute lg:relative lg:flex`,
        iconButton: "p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:bg-gray-200",
        courseChatListItem: `p-3 hover:bg-gray-100 focus:bg-gray-100 rounded-xl flex justify-start 
        items-center w-full text-left focus:outline-none`,
        hiddenWhenCollapsed: " " + (!expanded && "lg:hidden"),
        hiddenWhenExpanded: " " + (expanded && "lg:hidden"),
        avatar: "h-11 w-11 flex justify-center items-center rounded-full text-white ",
        selected: " bg-blue-50 text-blue-700 hover:bg-blue-100 focus:bg-blue-100",
    }


    return <Transition
        show={isOpen || !mobile}
    >
        <div
            className={styles.root}>
            <div className="h-stack default-padding">
                <div className="h-stack space-x-3">
                    <AccountMenu/>
                    <h1 className={"text-2xl font-semibold " + styles.hiddenWhenCollapsed}>{config.title}</h1>
                </div>

                <div className={"h-stack text-gray-600 space-x-2 " + styles.hiddenWhenCollapsed}>
                    <button className={styles.iconButton + " lg:hidden"} onClick={() => onClose(false)}>
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <NavbarButtons buttons={config.buttons}/>
                </div>
            </div>
            <ul className="space-y-1 overflow-y-auto mt-0.5">
                {loading ? <></> : (config.sidebarItems.length > 0 ? (config.sidebarItems.map(item => <li key={item.id}>
                    <button
                        onClick={() =>  item.onClick(item)}
                        className={styles.courseChatListItem + ((item.id === config.selectedItem) && styles.selected)}>
                           <span className={styles.avatar + "bg-blue-500"}>
                               {item.title.substring(0, 2)}
                        </span>
                        <div className={"leading-tight ml-2" + styles.hiddenWhenCollapsed}>
                            <h2 className="font-semibold">{item.title}</h2>
                            <p className="text-sm opacity-50">{item.description}</p>
                        </div>
                    </button>
                </li>)) : (<div className="p-4 rounded-lg text-center bg-primary-50 text-primary-600">
                    <p className="text-lg font-medium">Create a course</p>
                </div>))}
            </ul>
            <Spacer/>
            <button className={styles.courseChatListItem + " hidden lg:flex"} onClick={() => toggleExpanded(!expanded)}>
                <div className="flex justify-center w-full items-center mx-auto text-gray-500">
                    <div className="p-2 border rounded-lg shadow-sm">
                        <svg className={`h-4 transform ${!expanded && 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                        </svg>
                    </div>
                    {expanded && <div className="w-full">
                        <p className="ml-2">
                            Collapse
                        </p>
                    </div>}
                </div>
            </button>
        </div>
    </Transition>
}