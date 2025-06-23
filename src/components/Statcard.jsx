const StatCard = ({ title, value, subtext, tag }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>
        {value}
        {subtext && <><br /><small>{subtext}</small></>}
        {tag && <div className="tag">{tag}</div>}
      </p>
    </div>
  );
};

export default StatCard;
    