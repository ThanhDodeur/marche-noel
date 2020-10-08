import React from "react";

export { useDarkMode };

function useDarkMode() {
    const preferDarkMedia = "(prefers-color-scheme: dark)";
    const [mode, setMode] = React.useState(() => {
        return (
            window.localStorage.getItem("color-scheme-option") ||
            (window.matchMedia(preferDarkMedia).matches ? "dark" : "light")
        );
    });
    React.useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkMedia);
        const onMediaChange = () =>
            setMode(mediaQuery.matches ? "dark" : "light");
        mediaQuery.addListener(onMediaChange);
        window.localStorage.setItem("color-scheme-option", mode);
        return () => mediaQuery.removeListener(onMediaChange);
    }, [mode]);

    return [mode, setMode];
}
