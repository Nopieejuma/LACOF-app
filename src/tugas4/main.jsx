import { createRoot } from "react-dom/client";
import './tailwind.css';
// import FrameworkListIp from "./FrameworkListIp";
import FrameworkSearchFilIp from "./FrameworkSearchFilIp";


createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkListIp/> */}
            <FrameworkSearchFilIp/>
        </div>
    )