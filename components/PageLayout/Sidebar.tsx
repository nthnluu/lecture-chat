import {useState} from "react";
import Link from "next/link";
import Divider from "../Misc/Divider";
import Spacer from "../Misc/Spacer";
import {Transition} from "@headlessui/react";

export default function Sidebar({mobile, isOpen, onClose = null}) {
    const [expanded, toggleExpanded] = useState(true)
    const styles = {
        root: `${expanded ? "w-100" : "w-100 md:w-auto"} h-full md:border-r shadow-2xl 
        md:shadow-none border-gray-200 bg-white z-50 shadow-sm p-2.5 flex flex-col absolute md:relative md:flex`,
        iconButton: "p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:bg-gray-200",
        courseChatListItem: `p-3 hover:bg-gray-100 focus:bg-gray-200 rounded-xl flex justify-start 
        items-center w-full text-left focus:outline-none`,
        hiddenWhenCollapsed: " " + (!expanded && "md:hidden"),
        hiddenWhenExpanded: " " + (expanded && "md:hidden"),
        avatar: "h-11 w-11 flex justify-center items-center rounded-full text-white ",
        selected: " bg-blue-50 text-blue-600 hover:bg-blue-100 focus:bg-blue-100 border border-blue-100 shadow-sm",
    }
    return <Transition
        show={isOpen || !mobile}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        <div
            className={styles.root}>
            <div className="h-stack p-2.5">
                <div className="h-stack">
                    <img
                        className={`${styles.avatar} mr-2`}
                        src="https://firebasestorage.googleapis.com/v0/b/brown-ep.appspot.com/o/placeholder_avatar.png?alt=media&token=37fab188-d312-48d6-82fe-8b74e84f929e"/>
                    <h1 className={"text-2xl font-semibold " + styles.hiddenWhenCollapsed}>Chats</h1>
                </div>

                <div className={"flex justify-end items-center text-gray-600 space-x-2 " + styles.hiddenWhenCollapsed}>
                    <button className={styles.iconButton + " md:hidden"} onClick={() => onClose(false)}>
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
            <Divider className="my-2"/>
            <ul className="my-4 space-y-1">
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
            <button className={styles.courseChatListItem + " hidden md:flex"} onClick={() => toggleExpanded(!expanded)}>
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