import React from "react";
import "./Member.css";

export default function Member({
    index,
    className = "",
    style,
    member,
}) {
    const { name, role, image, links } = member;
    // Determine whether we should flip layout
    const isReversed = (typeof index === "number" ? index % 2 === 0 : false);

    const cardClass = ["profile-card", isReversed ? "is-reversed" : "", className]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={cardClass} style={style}>
            {/* Avatar (image or placeholder) */}
            <div className="avatar">
                {image ? (
                    <img src={image} alt={name} />
                ) : (
                    <span className="avatar-placeholder">+</span>
                )}
            </div>

            {/* Info text + socials */}
            <div className="info">
                <h2 className="name">{name}</h2>
                <p className="role">{role}</p>
                <div className="social-buttons">
                    {links.linkedin && (
                        <a
                            href={links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                            <span>LinkedIn</span>
                        </a>
                    )}
                    {links.twitter && (
                        <a
                            href={links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            aria-label="Twitter"
                        >
                            <TwitterIcon />
                            <span>Twitter</span>
                        </a>
                    )}
                    {links.github && (
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

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
