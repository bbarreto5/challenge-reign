
import "./index.css"
import { Favorite, AccessTime, FavoriteBorder } from '@mui/icons-material';
import { useState } from "react";
import imgFavorite1 from './conmonstr-favorite-2.png';
import imgFavorite2 from './iconmonstr-favorite-3.png';

interface ICard {
    favorite?: boolean;
    date: string;
    description: string;
    handle: (a: boolean) => void;
}

const Card = (props: ICard) => {
    const {
        favorite,
        date,
        description,
        handle
    } = props

    const [myFavorite, setMyFavorite] = useState<boolean>(favorite || false);

    const handleMyFavorite = ()=>{
        setMyFavorite(!myFavorite)
        handle(!myFavorite);
    }


    return (
        <div className="container_card">
            <div className="container_card_info">
                <div>
                    <AccessTime /> <span> {date} </span>
                </div>
                <div>
                    {description}
                </div>
            </div>
            <div className="container_card_icon">
                {
                    myFavorite ? <Favorite onClick={handleMyFavorite} color="secondary" /> : < FavoriteBorder onClick={handleMyFavorite} htmlColor="white" />
                }
            </div>
        </div>
    )

}

export default Card