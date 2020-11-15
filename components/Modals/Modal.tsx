import React from "react";
import {Transition} from "@headlessui/react";
import FocusTrap from "focus-trap-react";

const Modal = ({isOpen, onClose, title, content, buttons}) => {
    return <div className={`fixed inset-0 overflow-y-auto ${!isOpen && "pointer-events-none"}`} style={{zIndex: 5000}}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition show={isOpen}
                        enter="ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
            >
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"/>
                </div>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"/>&#8203;
                <FocusTrap active={isOpen}>
                    <div
                        className="inline-block mx-0 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button type="button"
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                    aria-label="Close">
                                {/* Heroicon name: x */}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div className="sm:flex sm:items-start w-full">
                            <div
                                className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                                {/* Heroicon name: exclamation */}
                                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-screen sm:w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    {title}
                                </h3>
                                <div className="mt-4 w-full">
                                    {content}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            {buttons.map((button, index) => <span key={index}
                                                                  className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button type="button"
                        disabled={button.disabled}
                        onClick={button.onClick}
                        className={`inline-flex justify-center w-full ${button.disabled && "opacity-50"} rounded-md border 
                            border-transparent px-4 py-2 bg-primary-600 text-base leading-6
                            font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none
                            focus:border-primary-700 focus:shadow-outline-primary transition ease-in-out duration-150 sm:text-sm sm:leading-5`}>
                  {button.label}
                </button>
              </span>)}

                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button type="button"
                        onClick={onClose}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  Cancel
                </button>
              </span>
                        </div>
                    </div>
                </FocusTrap>
                {/*</Transition>*/}

            </Transition>
        </div>
    </div>
}

export default Modal