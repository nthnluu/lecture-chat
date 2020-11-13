import * as React from "react";
import {Menu, Transition} from "@headlessui/react";
import {useContext} from "react";
import SessionContext from "../../util/SessionContext";
import fb from "../../util/firebase-config";
import {useRouter} from "next/router";

export default function () {
    const router = useRouter()

    const styles = {
        avatar: "h-11 w-11 flex justify-center items-center rounded-full text-white ",
    }

    const {userProfile} = useContext(SessionContext)

    function signOut() {
        fb.auth().signOut()
            .then(() => router.push('/login'))
    }

    return (
        <div className="relative text-left z-50">
            <Menu>
                {({open}) => (
                    <>
                        <Menu.Button className="h-auto">
                            <img
                                className={`${styles.avatar} mr-3`}
                                src={userProfile.photoURL}/>
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
                                    left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200
                                    divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                            >
                                <div className="px-4 py-3">
                                    <p className="text-sm leading-5">Signed in as</p>
                                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                                        {userProfile.email}
                                    </p>
                                </div>

                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="#account-settings"
                                                className={`${
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700"
                                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                            >
                                                Account settings
                                            </a>
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
                                                Support
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item
                                        as="span"
                                        disabled
                                        className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                                    >
                                        New feature (soon)
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
                                                License
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>

                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <button
                                                onClick={signOut}
                                                className={`${
                                                    active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700"
                                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                            >
                                                Sign out
                                            </button>
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
