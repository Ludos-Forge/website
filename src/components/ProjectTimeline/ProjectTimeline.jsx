
const items = [
  {
    title: "January 2022",
    cardTitle: "Event 1",
    cardSubtitle: "Event 1 Subtitle",
    cardDetailedText: "This is the first event on the timeline.",
  },
  {
    title: "February 2022",
    cardTitle: "Event 2",
    cardSubtitle: "Event 2 Subtitle",
    cardDetailedText: "This is the second event on the timeline.",
  },
  {
    title: "March 2022",
    cardTitle: "Event 3",
    cardSubtitle: "Event 3 Subtitle",
    cardDetailedText: "This is the third event on the timeline.",
  }
];

const ProjectTimeline = () => {
  return (
  <div style={{ display: 'flex', flexDirection:'column', gap: '16px', overflowX: 'auto' }}>
    {items.map((item, idx) => (
      <div
        key={idx}
        style={{
          minWidth: '300px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          flex: '0 0 auto'
        }}
      >
        <h3>{item.cardTitle}</h3>
        <h4 style={{ color: '#888', marginTop: 0 }}>{item.cardSubtitle}</h4>
        <p>{item.cardDetailedText}</p>
        <span style={{ fontSize: '0.9em', color: '#aaa' }}>{item.title}</span>
      </div>
    ))}
  </div>
  );
};

export default ProjectTimeline;