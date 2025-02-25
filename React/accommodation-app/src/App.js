import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all accommodations on mount
  useEffect(() => {
    fetchAllAccommodations();
  }, []);

  const fetchAllAccommodations = async () => {
    try {
      const response = await api.get("/acomodacoes");
      setAccommodations(response.data);
    } catch (error) {
      console.error("Erro ao buscar acomodações:", error);
      setAccommodations([]);
    }
  };

  // Filter accommodations as user types
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchLocation(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = accommodations.filter((acc) =>
      acc.location.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleSelectSuggestion = (selectedLocation) => {
    setSearchLocation(selectedLocation);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (searchLocation.trim() === "") {
      fetchAllAccommodations();
    } else {
      fetchAccommodationsByLocation(searchLocation);
    }
  };

  const fetchAccommodationsByLocation = async (location) => {
    try {
      const response = await api.get("/acomodacoes", { params: { location } });
      setAccommodations(response.data);
    } catch (error) {
      console.error("Erro ao buscar por localização:", error);
      setAccommodations([]);
    }
  };

  const fetchAccommodationById = async (id) => {
    try {
      const response = await api.get(`/acomodacoes/${id}`);
      setSelectedAccommodation(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching accommodation details:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <div className="container">
          <a className="navbar-brand" href="#">Anfitriões de Aluguel</a>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container my-5">
        {/* Search Card */}
        <div className="row mb-4">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title text-center mb-3">Buscar Acomodações</h4>

                {/* Search Input */}
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por localização"
                    value={searchLocation}
                    onChange={handleInputChange}
                  />

                  {/* Suggestions Dropdown */}
                  {searchLocation && suggestions.length > 0 && (
                    <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                      {suggestions.map((acc) => (
                        <li
                          key={acc.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSelectSuggestion(acc.location)}
                          style={{ cursor: "pointer" }}
                        >
                          <strong>{acc.name}</strong> - {acc.location}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Search Button */}
                <button
                  className="btn btn-info text-white mt-3 w-100"
                  type="button"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodations List */}
        <h2 className="mb-4 text-center">Lista de Acomodações</h2>
        <div className="row">
          {accommodations.length > 0 ? (
            accommodations.map((acc) => (
              <div
                key={acc.id}
                className="col-md-4 mb-4"
                onClick={() => fetchAccommodationById(acc.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={acc.image}
                    className="card-img-top"
                    alt={acc.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{acc.name}</h5>
                    <p className="card-text mb-4">
                      <strong>Localização:</strong> {acc.location}
                      <br />
                      <strong>Preço por noite:</strong> R${acc.price_night}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Nenhuma acomodação encontrada.</p>
          )}
        </div>
      </div>

      {/* Accommodation Details Modal */}
      {selectedAccommodation && (
        <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedAccommodation.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedAccommodation.image}
                  className="img-fluid mb-3"
                  alt={selectedAccommodation.name}
                />
                <p><strong>Localização:</strong> {selectedAccommodation.location}</p>
                <p><strong>Preço por noite:</strong> R${selectedAccommodation.price_night}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-light py-3">
        <div className="container text-center">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} - Our Accommodations App
          </small>
        </div>
      </footer>
    </div>
  );
};

export default App;
