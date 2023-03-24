import { useEffect, useState } from "react";
import { Badge, Card, Col, Image, ProgressBar, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";

function Detail() {
  const [abilities, setAbilities] = useState([]);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id);
      const data = await response.json();
      setAbilities(data);
      console.log("abilities",data)
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(abilities);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/` + id
      );
      const data = await response.json();
      setSpecies(data);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchEvolutionChain() {
      if (!species.evolution_chain) return;
      const response = await fetch(species.evolution_chain.url);
      const data = await response.json();
      setEvolutionChain(data);
    }

    fetchEvolutionChain();
  }, [species]);

  console.log(abilities);

  const hpStat = abilities?.stats?.find((stat) => stat.stat.name === "hp");
  const hpValue = hpStat?.base_stat;
  const attStat = abilities?.stats?.find((stat) => stat.stat.name === "attack");
  const attValue = attStat?.base_stat;
  const deffStat = abilities?.stats?.find(
    (stat) => stat.stat.name === "defense"
  );
  const deffValue = deffStat?.base_stat;
  const spAttStat = abilities?.stats?.find(
    (stat) => stat.stat.name === "special-attack"
  );
  const spAttValue = spAttStat?.base_stat;
  const spDeffStat = abilities?.stats?.find(
    (stat) => stat.stat.name === "special-defense"
  );
  const spDeffValue = spDeffStat?.base_stat;
  const speedStat = abilities?.stats?.find(
    (stat) => stat.stat.name === "speed"
  );
  const speedsValue = speedStat?.base_stat;
  const item  = species?.genera[7].genus

  // console.log("kleng", species?.flavor_text_entries[0].flavor_text);

  return (
    <div className="d-flex justify-content-center align-items-center mb-5" style={{marginTop: "5rem"}}>
        <div 
        className="card shadow"
        style={{ borderRadius: "1rem", width: "40rem", backgroundColor:"lightblue"}}
        >
        <div className="ms-4 mt-4">
          <h2 className="text-light">{abilities?.name}</h2>
          {abilities?.types?.map((type) => {
            return (
              <div
                style={{
                  fontSize: "14px",
                  display: "inlineBlock",
                  marginRight: "5px",
                }}
              >
                <Badge
                  bg="light"
                  text="dark"
                  className="p1 rounded-pill mb-1 inline-block"
                  style={{
                    fontSize: "14px",
                    display: "inlineBlock",
                    marginRight: "5px",
                  }}
                >
                  {type.type.name}
                </Badge>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-center">
          <Image
            style={{ width: "20rem" }}
            src={abilities?.sprites?.other?.home?.front_default}
            alt={abilities?.name}
          />
        </div>
        <div class="card-body">
          <Card className="border-0 border-top border-radius-1">
            <Tabs
              defaultActiveKey="About"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="About" title="About" className="ms-3 mb-3">
                <p> Species : {item?.split(" ")[0]} </p>
                <p> Height : {(Math.round(abilities.height * 10) / 100).toFixed(2)} m</p>
                <p> Weight : {abilities.weight/10} kg</p>
                <div className="d-flex">
                  <p className="me-2">Abilities : </p>
                  {abilities?.abilities?.map((item, idx) => (
                    <div>
                      <Badge className="me-1" key={idx} bg="dark">
                        {item.ability.name}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="Base Stats" title="Base Stats" className="ms-3 mb-3 p-2">
              
                <p> HP : {hpValue} <ProgressBar variant={hpValue > 50 ? "success" : "danger"} now={hpValue} /> </p>  
                <p> Attack : {attValue} <ProgressBar variant={attValue > 50 ? "success" : "danger"}  now={attValue} /></p>
                <p> Defense : {deffValue}<ProgressBar variant={deffValue > 50 ? "success" : "danger"} now={deffValue} /></p>
                <p> Sp. Atk : {spAttValue}<ProgressBar variant={spAttValue> 50 ? "success" : "danger"} now={spAttValue} /></p>
                <p> Sp. Def : {spDeffValue}<ProgressBar variant={spDeffValue> 50 ? "success" : "danger"} now={spDeffValue} /></p>
                <p> Speed : {speedsValue}<ProgressBar variant={speedsValue> 50 ? "success" : "danger"} now={speedsValue} /></p>
              </Tab>
              {/* <Tab eventKey="Evolution" title="Evolution"></Tab> */}
              <Tab eventKey="Evolution" title="Evolution" className="ms-3 mb-3">
                {evolutionChain && (
                  <div className="d-flex flex-wrap">
                    <div className="text-center me-4">
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          evolutionChain.chain.species.url.split("/")[6]
                        }.png`}
                        style={{ width: "80px" }}
                      />
                      <p className="mb-0">
                        {evolutionChain.chain.species.name}
                      </p>
                    </div>
                    {evolutionChain.chain.evolves_to.map((evolution1) => (
                      <div className="text-center me-4">
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            evolution1.species.url.split("/")[6]
                          }.png`}
                          style={{ width: "80px" }}
                        />
                        <p className="mb-0">{evolution1.species.name}</p>
                      </div>
                    ))}
                    {evolutionChain.chain.evolves_to.map((evolution1) =>
                      evolution1.evolves_to.map((evolution2) => (
                        <div className="text-center me-4">
                          <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                              evolution2.species.url.split("/")[6]
                            }.png`}
                            style={{ width: "80px" }}
                          />
                          <p className="mb-0">{evolution2.species.name}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </Tab>
              <Tab eventKey="Moves" title="Moves" className="ms-3 mb-3">
                <Row>
              {abilities?.moves?.map((moves, idx) => (
                  <Col xs={3} sm={6} >
                  <li>
                    {moves?.move.name}        
                    </li>
                  </Col>
              ))}
              </Row>
              </Tab>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Detail;
