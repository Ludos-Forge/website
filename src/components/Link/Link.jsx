

import React from "react";
import { FaInstagram, FaSteam, FaEnvelope, FaGlobe } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { useEffect } from "react";
import { useAnalytics } from "../../context/AnalyticsContext";


const Link = () => {
    const analytics = useAnalytics();
    
    useEffect(() => {
        analytics.pageview();
    }, [analytics]);
    return (
        <div className="h-screen bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col items-center justify-between">
            {/* Profile Section */}
            <div className="w-full max-w-3xl mx-auto text-center mt-4 mb-4">
                <Image src={logo} alt="LUDOS FORGE Logo" width={120} height={120} className="mx-auto mb-3" />
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">LUDOS FORGE</h1>
                <p className="text-sm sm:text-base text-gray-300 mb-4 max-w-2xl mx-auto px-2">
                    We forge video games with passion, creative freedom, and collective spirit. Every game is a challenge, a dream and an experience for those who play.
                </p>
            </div>

            {/* Links Section */}
            <div className="w-full max-w-md mx-auto space-y-2 px-4 flex-grow">
                <GreenLink link={"https://ludosforge.it"} Icon={FaGlobe} text={"Visit our Website"} analyticsLabel="website" />
                <GreenLink link={"https://www.instagram.com/ludos_forge"} Icon={FaInstagram} text={"Follow us on Instagram"} analyticsLabel="instagram" />
                <WhiteLink link={"https://store.steampowered.com/app/3650510/Malware_City/"} Icon={FaSteam} text={"Malware City"} analyticsLabel="steam_malware_city" />
                <GreenLink link={"https://store.steampowered.com/search/?developer=Ludos%20Forge"} Icon={FaSteam} text={"Follow us on Steam"} analyticsLabel="steam_ludos_forge" />
                <GreenLink link={"mailto:contact@ludosforge.it"} Icon={FaEnvelope} text={"Contact Us"} analyticsLabel="mail" />
            </div>

            {/* Footer */}
            <footer className="mt-4 mb-2 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} LUDOS FORGE. All rights reserved.</p>
            </footer>
        </div>)
}


const WhiteLink = ({ link, Icon, text, analyticsLabel }) => {
    const analytics = useAnalytics();
    
    const handleClick = () => {
        analytics.event({
            category: 'Link Click',
            action: 'Click',
            label: analyticsLabel
        });
    };

    return (<a
        href={link}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className="flex items-center justify-between p-3 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all rounded-lg text-black"
    >
        <span className="flex items-center gap-3">
            <Icon className="text-2xl" />
            <span className="font-medium">{text}</span>
        </span>
        <span className="text-gray-400">&rarr;</span>
    </a>);
}


const GreenLink = ({ link, Icon, text, analyticsLabel }) => {
    const analytics = useAnalytics();
    
    const handleClick = () => {
        analytics.event({
            category: 'Link Click',
            action: 'Click',
            label: analyticsLabel
        });
    };

    return (<a
        href={link}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className="relative flex items-center justify-between p-3 bg-gradient-to-r from-green-400/30 via-transparent to-transparent border border-green-400/30 shadow-md hover:scale-[1.02] transform transition-all rounded-lg text-white"
    >
        <span className="flex items-center gap-3">
            <Icon className="text-2xl" />
            <span className="font-medium">{text}</span>
        </span>
        <span className="text-green-200">&rarr;</span>
    </a>)
}

export default Link;