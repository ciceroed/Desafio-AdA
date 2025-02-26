import AccommodationCard from "./accommodationCard";

const AccommodationList = ({ accommodations, onSelect }) => {
  return (
    <div className="row">
      {accommodations.length > 0 ? (
        accommodations.map((acc) => (
          <AccommodationCard key={acc.id} accommodation={acc} onSelect={onSelect} />
        ))
      ) : (
        <p className="text-center">Nenhuma acomodação encontrada.</p>
      )}
    </div>
  );
};

export default AccommodationList;
