import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2023 Universidad Sergio Arboleda</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#3f0069',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    zIndex: '1',
    marginTop: '20px', // Añade margen superior
  },
};

export default Footer;
