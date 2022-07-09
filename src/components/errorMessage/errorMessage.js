import img from './404error.gif'

const ErrorMessage = () => {
  return (
    <img
      style={{
        display: 'block',
        width: '250px',
        heigh: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={img}
      alt='error'
    />
  );
};

export default ErrorMessage;
