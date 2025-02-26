const Footer = () => {
    return (
      <footer className="bg-light py-3">
        <div className="container text-center">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} - Our Accommodations App
          </small>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  