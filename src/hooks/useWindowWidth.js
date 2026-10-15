
import { useState, useEffect } from "react";

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        let lastExecution = 0;

        function handleResize() {
            const now = Date.now();

            if (now - lastExecution >= 200) {
                setWidth(window.innerWidth);
                lastExecution = now;
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return width;
}

export default useWindowWidth;
