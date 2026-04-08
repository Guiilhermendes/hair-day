import Logo from "../assets/images/logo.svg?react";

export default function() {
    return (
        <div
            className={
                `
                    flex items-center justify-center 
                    w-full max-w-34.75 h-14
                    bg-gray-600 border border-gray-600
                    rounded-br-xl absolute top-0 left-0
                `
            }
        >
            <Logo />
        </div>
    )
} 