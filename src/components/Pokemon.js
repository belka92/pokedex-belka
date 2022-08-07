import axios from "axios";
import React, { useEffect, useState } from "react";
import './Pokemon.css';
import PokemonInfo from "./PokemonInfo";

const Pokemon = ({ 
    url,
        id,
        name,
        image,
        type,
        weight,
        height,
        stats,
        statsName, 
}) => {
    const [poke, setPoke] = useState('');
    const [err, setErr] = useState(false);
    

    console.log(poke)
    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const res = await axios.get(url);
                setPoke(res);
                setErr(false);
            } catch (err) {
                setErr(true);
            }
        }
        loadPokemon();
    }, [])

    

    const typeSelect = (type) => {
        switch (type) {
            case 'normal':
                return "#A7A884";
                break;
            case 'grass':
                return "#8DC86F";
                break;
            case 'ground':
                return "#dfbf68";
                break;
            case 'fighting':
                return "#bf3028";
                break;
            case 'rock':
                return "#b8a137";
                break;
            case 'steel':
                return "#b9b7cf";
                break;
            case 'fire':
                return "#EE9A5E";
                break;
            case 'electric':
                return "#F7D344";
                break;
            case 'flying':
                return "#BF453E";
                break;
            case 'psychic':
                return "#F86994";
                break;
            case 'bug':
                return "#BDCB44";
                break;
            case 'dragon':
                return "#6f38f6";
                break;
            case 'water':
                return "#83A3EE";
                break;
            case 'ice':
                return "#98d5d6";
                break;
            case 'poison':
                return "#A06BA0";
                break;
            case 'dark':
                return "#725847";
                break;
            case 'ghost':
                return "#6e5896";
                break;
            case 'fairy':
                return "#feaec7";
                break;
        }
    }

    const concat = (result) => {
        let i;
        let str = [];
        for (i in result) {
            str.push(result[i].type.name);
        }
        return str;
    }



    const [modalIsOpen, setModalIsOpen] = useState(false);

    function modalHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }


    return (
        <>
            {poke !== '' && 
                <div className={`pokemon ${poke.data.types[0].type.name}`}
                    style={{ backgroundColor: typeSelect(poke.data.types[0].type.name) }}
                >

                    <h2 className="pokemon_title">#{poke.data.id} {poke.data.name}</h2>
                    <div className="elements">
                        {concat(poke.data.types).map((result, key) => (
                            <p key={key} className="elements--title"
                                style={{ backgroundColor: typeSelect(result) }}
                            >{result}</p>
                        ))}
                    </div>
                    <div className="img">
                        <img src={poke.data.sprites.other["official-artwork"].front_default} style={{ width: "150px", height: "150px" }} alt="Pokemon" />
                    </div>
                    <div className="btn"
                onClick={modalHandler}>
                    <p className="btnMore">Pokemon Info</p>
                    </div>
                    
                </div>
            }
            {err && <h2>not found</h2>}
            
                    {modalIsOpen &&(
                    <PokemonInfo
                    id={poke.data.id}
                    name={poke.data.name}
                    image={poke.data.sprites.other["official-artwork"].front_default}
                    height={poke.data.height}
                    weight={poke.data.weight}
                    stats={poke.data.stats}
                    type={poke.data.types[0].type.name}
                    onClick={closeModalHandler}
                    />
                )}
        </>
    );
}

export default Pokemon;
