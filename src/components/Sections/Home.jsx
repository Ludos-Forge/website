import React from "react";
import TextType from "../TextType";

export default function Home({ isMobile, currentSection, index }) {
    const textProps = {
        text: "Ludos Forge",
        as: "h1",
        typingSpeed: 250,
        pauseDuration: 1500,
        showCursor: true,
        monoColor: isMobile,
    };

    return (

        <div className="relative w-full h-screen flex flex-col items-center justify-center">
            {/* Titolo "Ludos Forge" */}
            {!isMobile && (<>
                <div className="absolute top-0 left-0 w-1/2 h-screen bg-white z-0">
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-screen bg-black z-0">
                </div>
            </>
            )
            }
            <div
                className={`absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] ${isMobile
                    ? "text-center w-[80%]"
                    : "text-left w-[425px]"
                    }`}
            >
                <TextType {...textProps} />
            </div>


        </div>
    );
}
