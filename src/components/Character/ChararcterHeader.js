import { Link } from 'react-router-dom';
import { ArrowBack, Backpack, Face, Save } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

import "../../assets/css/characterHeader.css";

export default function CharacterHeader(props) {
    let { id } = useParams();

    return(
        <div className="character-header-container">
            <div className="ch-btn-container">
                <Link to="/Orceus/SelectCharacters">
                    <ArrowBack/>
                </Link>
            </div>
            <div className="ch-btn-container">
                <Save onClick={props.saveCharacter}/>
                <Link to={"/Orceus/SelectCharacters/" + id}>
                    <Face/>
                </Link>
                <Link to={"/Orceus/SelectCharacters/" + id + "/inventory"}>
                    <Backpack/>
                </Link>
            </div>
        </div>
    );
}