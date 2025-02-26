const AccommodationCard = ({ accommodation, onSelect }) => {
    return (
      <div
        className="col-md-4 mb-4"
        onClick={() => onSelect(accommodation.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="card h-100 shadow-sm">
          <img
            src={accommodation.image}
            className="card-img-top"
            alt={accommodation.name}
            style={{ objectFit: "cover", height: "200px" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{accommodation.name}</h5>
            <p className="card-text mb-4">
              <strong>Localização:</strong> {accommodation.location}
              <br />
              <strong>Preço por noite:</strong> R${accommodation.price_night}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AccommodationCard;
  