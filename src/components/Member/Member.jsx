import React from "react";
import "./Member.css";
import { FaArtstation, FaGithub, FaGlobe, FaInstagram, FaItchIo, FaLinkedin, FaTwitter } from "react-icons/fa6";

const iconMap = {
    linkedin: FaLinkedin,
    github: FaGithub,
    twitter: FaTwitter,
    website: FaGlobe,
    artstation: FaArtstation,
    instagram: FaInstagram,
    itch: FaItchIo,
};

function Member({ member }) {
    // Controllo di sicurezza: se member è undefined o null, restituisci null
    if (!member) {
        console.warn("Member component received undefined or null member prop");
        return null;
    }

    const { name, role, bio, avatar, social, links } = member;

    // Gestisci i link in modo sicuro
    let memberLinks = [];
    
    if (social && Array.isArray(social)) {
        memberLinks = social;
    } else if (links) {
        memberLinks = Array.isArray(links)
            ? links.flatMap(obj => Object.entries(obj))
            : Object.entries(links);
    }

    return (
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto bg-white rounded-xl shadow-lg p-4 flex flex-col items-center mx-auto">
            <img
                src={avatar || "/placeholder-avatar.png"}
                alt={`Avatar di ${name || "Membro"}`}
                className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mb-4"
                loading="lazy"
            />
            <h3 className="text-lg md:text-2xl font-bold mb-1 text-center">{name || "Nome non disponibile"}</h3>
            <p className="text-sm md:text-base text-gray-600 mb-2 text-center">{role || "Ruolo non specificato"}</p>
            <p className="text-xs md:text-sm text-gray-500 text-center">{bio || ""}</p>
            {memberLinks.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {memberLinks.map((link, idx) => (
                        <a
                            key={link.url || idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="text-blue-600 hover:underline text-xs md:text-base"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Member;