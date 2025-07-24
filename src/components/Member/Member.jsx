import React from "react";
import "./Member.css";

const iconMap = {
    linkedin: LinkedInIcon,
    github: GitHubIcon,
    twitter: TwitterIcon,
    website: WebsiteIcon,
};
function Member({ member }) {
    const links = Array.isArray(member.links)
        ? member.links.flatMap(obj => Object.entries(obj))
        : Object.entries(member.links);

    return (
        <div className="relative flex h-4/6 max-w-xl overflow-hidden rounded-xl shadow-lg">
            <div
                className="absolute inset-0 bg-cover bg-center grayscale-50"
                style={{ backgroundImage: `url(${member.image})` }}
            />

            <div className="relative z-20 flex flex-1 flex-col justify-between p-4 text-white h-[calc(100%-8px)]">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{member.role}</h2>
                </div>
                <div className="flex gap-4">
                    {links.map(([platform, url], idx) => {
                        const Icon = iconMap[platform.toLowerCase()] || WebsiteIcon;
                        return (
                            <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-5 h-5 text-white hover:text-blue-400"
                            >
                                <Icon className="w-full h-full" />
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className="absolute flex flex-row-reverse right-0 w-8 h-full bg-white z-10">
                    <span className=" text-2xl from-black to-white origin-center whitespace-nowrap uppercase" style={{
                    writingMode: "tb",
                }}>
                    {member.name}
                </span>
            </div>

        </div >
    );
}

export default Member;

/* --- Icons split out for readability & reuse --- */
function LinkedInIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M4.98 3.5C4.98 5 4 6 2.5 6S0 5 0 3.5 1 1 2.5 1 4.98 2 4.98 3.5zM.5 8h4.96V24H.5V8zM8.3 8h4.74v2.16h.07C14 8.589 15.408 7 17.762 7c3.772 0 4.473 2.48 4.473 5.697V24h-4.97v-8.23c0-1.962-.036-4.485-2.735-4.485-2.737 0-3.156 2.14-3.156 4.342V24H8.3V8z" />
        </svg>
    );
}

function TwitterIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.95.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.722 0-4.928 2.206-4.928 4.928 0 .385.045.76.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.423.724-.666 1.561-.666 2.475 0 1.708.871 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.06c0 2.385 1.693 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.318-3.809 2.105-6.102 2.105-.396 0-.79-.023-1.175-.067C2.292 19.709 5.021 20.5 7.936 20.5c9.52 0 14.74-7.89 14.74-14.74 0-.224-.005-.447-.014-.669.993-.717 1.85-1.6 2.548-2.622z" />
        </svg>
    );
}

function GitHubIcon(props) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.779 8.205 11.387.6.111.82-.261.82-.579 0-.286-.011-1.04-.017-2.04-3.338.726-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.51 11.51 0 0 1 3.003-.404c1.02.004 2.045.137 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.243 2.873.119 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.479 5.921.429.37.81 1.1.81 2.219 0 1.604-.015 2.896-.015 3.289 0 .321.216.694.825.576C20.565 22.277 24 17.79 24 12.5 24 5.87 18.627.5 12 .5z" />
        </svg>
    );
}

function WebsiteIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.293 15.707l-1.414 1.414L12 14.414l-2.879 2.879-1.414-1.414L10.586 13 7.707 10.121l1.414-1.414L12 11.586l2.879-2.879 1.414 1.414L13.414 13l2.879 2.879z" />
        </svg>
    );
}