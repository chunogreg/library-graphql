const Notification = ({ errorMsg }) => {
  if (errorMsg === null) return null;
  return (
    <div
      style={{
        backgroundColor: "#f5dfdc",
        border: "2px solid #843508",
        fontSize: 18,
        paddingLeft: 55,
      }}
    >
      {errorMsg}
    </div>
  );
};

export default Notification;
