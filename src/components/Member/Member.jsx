import React from "react";
const Member = ({ member }) => {
    return (
        <div className="member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="social-links">
                {member.socialLinks.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}
export default Member;