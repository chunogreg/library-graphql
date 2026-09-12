const Notification = ({ errorMsg }) => {
  if (errorMsg === null) return null;
  return (
    <div
      style={{
        backgroundColor: "#f5efca",
        border: "2px solid #766f05",
        fontSize: 18,
        paddingLeft: 55,
      }}
    >
      {errorMsg}
    </div>
  );
};

export default Notification;
