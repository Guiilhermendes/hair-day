import Logo from "../assets/images/logo.svg?react";

export default function() {
    return (
        <div
            className={
                `
                    flex items-center justify-center 
                    w-full max-w-35 h-14
                    bg-gray-600 border border-gray-600
                    rounded-br-xl
                `
            }
        >
            <Logo />
        </div>
    )
} 