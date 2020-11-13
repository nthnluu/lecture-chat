import {useState} from "react";
import Link from "next/link";
import Divider from "../Misc/Divider";
import Spacer from "../Misc/Spacer";
import {Transition} from "@headlessui/react";
import Dropdown from "../Dropdown";
import AccountMenu from "./AccountMenu";

export default function Sidebar({mobile, isOpen, onClose = null}) {
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
                <div className="h-stack">
                    <AccountMenu/>
                    <h1 className={"text-2xl font-semibold " + styles.hiddenWhenCollapsed}>Chats</h1>

                </div>

                <div className={"flex justify-end items-center text-gray-600 space-x-2 " + styles.hiddenWhenCollapsed}>
                    <button className={styles.iconButton + " lg:hidden"} onClick={() => onClose(false)}>
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button className={styles.iconButton}>
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </button>
                    <button className={styles.iconButton}>
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                    </button>
                </div>
            </div>
            <ul className="space-y-1 overflow-y-auto mt-2">
                <li>
                    <Link href="/2">
                        <a className={styles.courseChatListItem + styles.selected}>
                           <span className={styles.avatar + "bg-blue-500"}>
                            CS
                        </span>
                            <div className={"leading-tight ml-2" + styles.hiddenWhenCollapsed}>
                                <h2 className="font-semibold">CSCI 0111</h2>
                                <p className="text-sm opacity-50">Lorem ipsum dolor sit anem...</p>
                            </div>
                        </a>
                    </Link>
                </li>
                <li>
                    <button className={styles.courseChatListItem}>
                           <span className={styles.avatar + "bg-teal-500"}>
                            EN
                        </span>
                        <div className={"leading-tight ml-2" + styles.hiddenWhenCollapsed}>
                            <h2 className="font-semibold">ENGL 0108</h2>
                            <p className="text-sm text-gray-400">Lorem ipsum dolor sit anem...</p>
                        </div>
                    </button>
                </li>
                <li>
                    <Link href="/2">
                        <a className={styles.courseChatListItem}>
                           <span className={styles.avatar + "bg-red-500"}>
                            CS
                        </span>
                            <div className={"leading-tight ml-2" + styles.hiddenWhenCollapsed}>
                                <h2 className="font-semibold">CSCI 0111</h2>
                                <p className="text-sm text-gray-400">Lorem ipsum dolor sit anem...</p>
                            </div>
                        </a>
                    </Link>
                </li>
                <li>
                    <button className={styles.courseChatListItem}>
                           <span className={styles.avatar + "bg-pink-500"}>
                            EN
                        </span>
                        <div className={"leading-tight ml-2" + styles.hiddenWhenCollapsed}>
                            <h2 className="font-semibold">ENGL 0108</h2>
                            <p className="text-sm text-gray-400">Lorem ipsum dolor sit anem...</p>
                        </div>
                    </button>
                </li>
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