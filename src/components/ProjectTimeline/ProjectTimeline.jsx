import { useState } from "react";
import { FaSteam, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Modal from "../Modal/Modal";

const items = [
  {
    id: 1,
    title: "Malware City",
    description: (<>
      <p>
        Malware City is a 2D platformer set in the heart of a digital metropolis. An anonymous hacker has created Vundo, a small trojan with a conscience. Its goal? To infect computers scattered across the city and uncover the truth about its origins.
      </p>
      <p>
        Explore Malware City! From here, you can choose which computer to attack, unlocking new paths as you gain powers.
      </p>
      <p>
        Each computer represents a world of its own, inspired by a different operating system and featuring unique mechanics and environments. Jump across folders, destroy system components, face off against aggressive antivirus programs, and conquer computers like a true trojan.
      </p>
      <p>
        Inside each computer, you'll find explorable sections with distinct behaviors, defenses, and challenges. As you progress, you'll collect upgrades that will make Vundo increasingly formidable.
      </p>
      <p>
        Discover hidden minigames within the systems you infect and unlock them in Arcade Mode: a nostalgic tribute to the digital past.
      </p>
      <p>
        Grow stronger and take on the most dangerous threats of the Dark Web as you get closer and closer to your true origin.
      </p>
      <p>
        Are you ready to face your creator?
      </p>
    </>),
    link: {
      steam: "https://store.steampowered.com/app/3650510/Malware_City/",
    },
    background: "assets/malware_city_cover.png",
  },
];

const ProjectTimeline = () => {
  const [selectedProject, setSelectedProject] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowX: 'auto' }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-cover  grayscale-50"
            style={{
              minWidth: '300px',
              height: '268px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              flex: '0 0 auto',
              backgroundImage: `url(${item.background})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',

            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', background: 'rgba(255, 255, 255, 0.2)' }}>
              <div style={{ padding: '16px', display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end' }}>
                <FaArrowUpRightFromSquare onClick={() => setSelectedProject(item)} style={{ cursor: 'pointer', width: "25px", height: "auto" }} />
                <a href={item.link.steam} target="_blank" rel="noreferrer"><FaSteam style={{ width: "30px", height: "auto" }} /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={selectedProject} onClose={() => setSelectedProject(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <img src={selectedProject.background} alt={selectedProject.title} />
          <h1>{selectedProject.title}</h1>
          <div>{selectedProject.description}</div>
        </div>
      </Modal>
    </>

  );
};

export default ProjectTimeline;