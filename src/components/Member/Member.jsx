import React from "react";
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
    const links = Array.isArray(member.links)
        ? member.links.flatMap(obj => Object.entries(obj))
        : Object.entries(member.links);

    return (
        <div className="relative flex h-[600px] w-[450px] overflow-hidden rounded-xl shadow-lg">
            <div
                className="absolute inset-0 bg-cover bg-center grayscale-70"
                style={{ backgroundImage: `url(${member.image})` }}
            />
            <div className="relative z-20 flex flex-1 flex-col justify-between p-4 text-white h-[calc(100%-8px)]">
                <div>
                    <h2 className="text-2xl font-bold text-white">{member.role}</h2>
                </div>
                <div className="flex gap-4">
                    {links.map(([platform, url], idx) => {
                        const Icon = iconMap[platform.toLowerCase()] || FaGlobe;
                        return (
                            <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center w-5 h-5 text-white hover:text-blue-400"
                            >
                                <Icon className="w-full h-full" />
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="absolute right-0 top-0 h-full w-8 bg-white z-10 flex pt-2">
                <span className="[writing-mode:vertical-rl] text-2xl text-black uppercase whitespace-nowrap">
                    {member.name}
                </span>
            </div>

        </div>
    );
}

export default Member;

