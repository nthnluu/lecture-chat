import React, {ReactElement} from "react";

interface Buttons {
    type: "icon" | "extended";
    style: "filled" | "outlined" | "light" | "invisible";
    color: "mono" | "primary"
    label: String;
    icon: ReactElement;
    onClick: () => void;
    selected?: Boolean
}

const NavbarButtons: React.FC<{ buttons: Buttons[] }> = ({buttons}) => {
    const styles = {
        root: "rounded-full hover:opacity-75 focus:opacity-50 transition-opacity duration-200 ",
        light: {
            primary: "bg-primary-100 text-primary-600 ",
            mono: "bg-gray-100 text-gray-600 "
        },
        filled: {
            primary: "bg-primary-600 text-white ",
            mono: "bg-black text-white "
        },
        outlined: {
            primary: "border-2 shadow-sm border-primary-500 text-primary-600 ",
            mono: "border border-gray-600 text-gray-600 "
        },
        invisible: {
            primary: "bg-transparent invisible ",
            mono: "bg-transparent invisible "
        },

        oval: "px-3 py-2 inline-flex items-center ",
        circle: "p-2 "
    }

    return <div className="space-x-2 flex items-center flex-no-wrap flex-shrink-0 ">
        {buttons.map((button, index) => {
            const isExtended = (button.type === "extended")
            return <button
                key={index}
                onClick={button.onClick}
                className={styles.root + styles[button.style][button.color] + (isExtended ? styles.oval : styles.circle) + (button.selected && " shadow-outline-primary")}>
                {React.cloneElement(button.icon, {className: `h-6 ${isExtended && "mr-1"}`})}
                {isExtended && button.label}
            </button>
        })}
    </div>
}

export default NavbarButtons