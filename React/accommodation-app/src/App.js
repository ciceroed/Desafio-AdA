import React, { useState, useEffect } from "react";
import api from "./api";
import Navbar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import AccommodationList from "./components/AccommodationList";
import AccommodationModal from "./components/AccommodationModal";
import Footer from "./components/Footer";

const App = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    fetchAllAccommodations();
  }, []);

  const fetchAllAccommodations = async (location) => {
    try {
      const response = await api.get("/acomodacoes", { 
        params: { location }
      });
      setAccommodations(response.data);
    } catch (error) {
      console.error("Erro ao buscar acomodações:", error);
    }
  };
  
  const fetchAccommodationById = async (id) => {
    const response = await api.get(`/acomodacoes/${id}`);
    setSelectedAccommodation(response.data);
  };

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <SearchBar accommodations={accommodations} onSearch={fetchAllAccommodations} />
        <AccommodationList accommodations={accommodations} onSelect={fetchAccommodationById} />
      </div>
      <AccommodationModal accommodation={selectedAccommodation} onClose={() => setSelectedAccommodation(null)} />
      <Footer />
    </div>
  );
};

export default App;
