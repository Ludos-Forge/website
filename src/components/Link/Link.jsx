

import React from "react";
import { FaInstagram, FaSteam, FaEnvelope, FaGlobe } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { useEffect } from "react";
import ReactGA from "react-ga4";


const Link = () => {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex flex-col items-center">
            {/* Profile Section */}
            <div className="w-full max-w-3xl mx-auto text-center mt-8 mb-12">
                <Image src={logo} alt="LUDOS FORGE Logo" width={150} height={150} className="mx-auto mb-6" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">LUDOS FORGE</h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    We forge video games with passion, creative freedom, and collective spirit. Every game is a challenge, a dream and an experience for those who play.
                </p>
            </div>

            {/* Links Section */}
            <div className="w-full max-w-md mx-auto space-y-4">
                <GreenLink link={"https://ludosforge.it"} Icon={FaGlobe} text={"Visit our Website"} />
                <GreenLink link={"https://www.instagram.com/ludos_forge"} Icon={FaInstagram} text={"Follow us on Instagram"} />
                <WhiteLink link={"https://store.steampowered.com/app/3650510/Malware_City/"} Icon={FaSteam} text={"Malware City"} />
                <GreenLink link={"https://store.steampowered.com/search/?developer=Ludos%20Forge"} Icon={FaSteam} text={"Follow us on Steam"} />
                <GreenLink link={"mailto:contact@ludosforge.it"} Icon={FaEnvelope} text={"Contact Us"} />

            </div>

            {/* Footer */}
            <footer className="mt-12 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} LUDOS FORGE. All rights reserved.</p>
            </footer>
        </div>)
}


const WhiteLink = ({ link, Icon, text }) => {
    return (<a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between p-4 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all rounded-lg text-black"
    >
        <span className="flex items-center gap-3">
            <Icon className="text-2xl" />
            <span className="font-medium">{text}</span>
        </span>
        <span className="text-gray-400">&rarr;</span>
    </a>);
}


const GreenLink = ({ link, Icon, text }) => {
    return (<a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-between p-4 bg-gradient-to-r from-green-400/30 via-transparent to-transparent border border-green-400/30 shadow-md hover:scale-[1.02] transform transition-all rounded-lg text-white"
    >

        <span className="flex items-center gap-3">
            <Icon className="text-2xl" />
            <span className="font-medium">{text}</span>
        </span>
        <span className="text-green-200">&rarr;</span>
    </a>)
}

export default Link;