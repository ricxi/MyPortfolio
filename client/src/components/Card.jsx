const Card = ({ children, style }) => {
  return (
    <div className='panel' style={style}>
      {children}
    </div>
  );
};

export default Card;
