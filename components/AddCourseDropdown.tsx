import * as React from "react";
import {Menu, Transition} from "@headlessui/react";
import {useContext} from "react";
import ModalContext from "../util/ModalContext";

export default function ({button}) {
    const {toggleCreateModal} = useContext(ModalContext)
    return (
            <div className="relative text-left z-50">
                <Menu>
                    {({open}) => (
                        <>
                            <Menu.Button className="h-auto">
                                {button}
                            </Menu.Button>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute
                                    right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200
                                    divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                >
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    onClick={() => toggleCreateModal(true)}
                                                    className={`${
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700"
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    Create new course
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#support"
                                                    className={`${
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700"
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    Join a course
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({active}) => (
                                                <a
                                                    href="#license"
                                                    className={`${
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700"
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    Get transcript
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
    );
}
