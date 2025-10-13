import { useState } from "react";
import { FaSteam, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Modal from "../Modal/Modal";

const items = [
  {
    id: 1,
    title: "Malware City",
    description: (
      <>
        <p>
          Malware City is a 2D platformer set in the heart of a digital
          metropolis. An anonymous hacker has created Vundo, a small trojan with
          a conscience. Its goal? To infect computers scattered across the city
          and uncover the truth about its origins.
        </p>
        <p>
          Explore Malware City! From here, you can choose which computer to
          attack, unlocking new paths as you gain powers.
        </p>
        <p>
          Each computer represents a world of its own, inspired by a different
          operating system and featuring unique mechanics and environments. Jump
          across folders, destroy system components, face off against aggressive
          antivirus programs, and conquer computers like a true trojan.
        </p>
        <p>
          Inside each computer, you'll find explorable sections with distinct
          behaviors, defenses, and challenges. As you progress, you'll collect
          upgrades that will make Vundo increasingly formidable.
        </p>
        <p>
          Discover hidden minigames within the systems you infect and unlock
          them in Arcade Mode: a nostalgic tribute to the digital past.
        </p>
        <p>
          Grow stronger and take on the most dangerous threats of the Dark Web
          as you get closer and closer to your true origin.
        </p>
        <p>Are you ready to face your creator?</p>
      </>
    ),
    link: {
      steam: "https://store.steampowered.com/app/3650510/Malware_City/",
    },
    background: "assets/malware_city_cover.png",
  },
];

const ProjectTimeline = () => {
  const [selectedProject, setSelectedProject] = useState(false);
  const openModal = (item) => {
    setSelectedProject(item);
  };

  const closeModal = () => {
    setSelectedProject(false);
  };
  return (
    <>
      <div className="flex flex-col gap-4 overflow-x-auto px-4 py-2 sm:flex-row sm:justify-start sm:gap-6 scrollbar-hide">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex-shrink-0 bg-cover bg-no-repeat bg-center grayscale-[50%] w-full h-[220px] rounded-xl shadow-md transition-transform hover:scale-[1.02]"
            style={{ backgroundImage: `url(${item.background})` }}
          >
            <div className="absolute inset-0 bg-white/20 flex flex-col justify-end rounded-xl">
              <div className="flex flex-col justify-between items-end h-full p-4">
                <FaArrowUpRightFromSquare
                  onClick={() => openModal(item)}
                  className="w-6 h-6 text-black hover:text-blue-500 cursor-pointer transition-colors"
                />
                <a
                  href={item.link.steam}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto"
                >
                  <FaSteam className="w-8 h-8 text-black hover:text-gray-700 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <Modal isOpen={selectedProject} onClose={closeModal}>
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src={selectedProject.background}
              alt={selectedProject.title}
              className="max-w-full rounded-lg shadow-md"
            />
            <h1 className="text-2xl font-bold">{selectedProject.title}</h1>
            <div className="text-gray-700 leading-relaxed space-y-3 text-left max-w-prose">
              {selectedProject.description}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectTimeline;