import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Badge, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import pokemonTypeColors from "../component/pokemonTypeColors"

function Content() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => console.error(error));
  }, []);

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await Promise.all(
        pokemonList.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
        )
      );
      setPokemonData(data);
    };
    fetchPokemonData();
  }, [pokemonList]);

  const handleNextClick = () => {
    fetch(nextUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => console.error(error));
  };

  const handlePrevClick = () => {
    fetch(prevUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => console.error(error));
  };

  console.log(pokemonData);


  return (
    <Container className="my-5">
        <div className="d-flex justify-content-between mb-3" style={{marginTop: "5rem"}}>
        <Button onClick={handlePrevClick} disabled={!prevUrl}>
          Previous
        </Button>
        <Button onClick={handleNextClick} disabled={!nextUrl}>
          Next
        </Button>
      </div>
      <Row xs={2} md={3} lg={4} className="justify-content-md-center g-4">
        {pokemonData.map((pokemon, idx) => (
          <Col key={idx} pokemon={pokemon}>
            <Link
              className="text-decoration-none text-dark"
              to={`/detail/` + pokemon.id}
            >
              <Card className="shadow" style={{ borderRadius: "1rem", backgroundColor: pokemonTypeColors[pokemon?.types[0].type.name] }}>
                <Card.Body className="d-flex justify-content-between">
                  <div>
                    <Card.Title className="text-light">{pokemon.name}</Card.Title>
                    <Card.Text>
                      {pokemon.types.map((type) => {
                        return (
                            <div>      
                          <Badge bg="light" text="dark" className="p1 rounded-pill mb-2" style={{ fontSize: "14px" }}>
                            {type.type.name}
                          </Badge>
                         </div>
                        );
                      })}
                    </Card.Text>
                  </div>
                  <div>
                    <Card.Img
                      style={{ width: "7rem" }}
                      variant="top"
                      src={pokemon.sprites.other.home.front_default}
                      alt={pokemon.name}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Content;
