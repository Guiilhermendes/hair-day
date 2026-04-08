import Logo from "../components/logo";
import Main from "../core-components/main";
import Sidebar from "../core-components/sidebar";

export default function PageHome() {
    return (
        <>
            <Logo />
            <div className="flex gap-3">
                <Sidebar />
                <Main />
            </div>
        </>
    )
}