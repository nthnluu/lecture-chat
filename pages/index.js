import PageLayout from "../components/PageLayout";
import Button from "../components/forms/Button";
import {useEffect} from "react";
import fb from "../util/firebase-config";

export default function Home() {
    function raiseHand() {
        const audio = new Audio('/raise_hand.m4a');
        audio.play();
    }
    const navbarButtons = [{type: "icon",
        label: "Hello",
        color: "primary",
        style: "light",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    }, {type: "extended",
        label: "Raise Hand",
        color: "primary",
        style: "filled",
        onClick: raiseHand,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
    }]

    return (
        <PageLayout title="CSCI 0111" buttons={navbarButtons} privateRoute={true} redirectPath='/login'>
            <div className="h-screen flex justify-center items-center px-12">
                <div className="text-center">
                    <img src="/logo.svg" className="h-16 md:h-24 lg:h-32 mx-auto mb-8"/>
                    <h1 className="text-4xl font-bold text-gray-900">Lecture Chat</h1>
                    <h2 className="text-xl text-gray-400 font-light mb-12 max-w-md mx-auto">
                        A simple, effective way for students and teachers to communicate.
                    </h2>
                    <Button sizes="xl" variant="light" onClick={() => {
                        fb.auth().signOut()
                    }}>🖐 Raise Hand</Button>
                </div>
            </div>
        </PageLayout>
    )
}
