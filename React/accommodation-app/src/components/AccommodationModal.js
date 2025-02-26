const AccommodationModal = ({ accommodation, onClose }) => {
    if (!accommodation) return null;
  
    return (
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{accommodation.name}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <img src={accommodation.image} className="img-fluid mb-3" alt={accommodation.name} />
              <p><strong>Localização:</strong> {accommodation.location}</p>
              <p><strong>Preço por noite:</strong> R${accommodation.price_night}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AccommodationModal;
  