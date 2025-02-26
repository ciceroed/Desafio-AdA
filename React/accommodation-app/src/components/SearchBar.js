import { useState } from "react";

const SearchBar = ({ accommodations, onSearch }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    onSearch(searchLocation);
  };

  return (
    <div className="row mb-4">
      <div className="col-md-8 mx-auto">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center mb-3">Buscar Acomodações</h4>

            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por localização"
                value={searchLocation}
                onChange={handleInputChange}
              />

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
  );
};

export default SearchBar;
