
import "./index.css"
import { AccessTime } from '@mui/icons-material';
import { useState } from "react";
import imgFavorite1 from '../../Source/Img/iconmonstr-favorite-2.png';
import imgFavorite2 from '../../Source/Img/iconmonstr-favorite-3.png';

interface ICard {
    favorite?: boolean;
    date: string;
    description: string;
    handle: (a: boolean) => void;
    url: string;
}

const Card = (props: ICard) => {
    const {
        favorite,
        date,
        description,
        handle,
        url
    } = props

    const [myFavorite, setMyFavorite] = useState<boolean>(favorite || false);

    const handleMyFavorite = () => {
        setMyFavorite(!myFavorite)
        handle(!myFavorite);
    }

    const openUrl = () => window.open(url, '_blank')?.focus();

    return (
        <div className="container_card">
            <div className="container_card_info" onClick={openUrl}>
                <div>
                    <AccessTime /> <span> {date} </span>
                </div>
                <div className="description">
                    {description}
                </div>
            </div>
            <div className="container_card_icon">
                <div className="background">

                </div>
                {
                    myFavorite
                        ? <img src={imgFavorite2} onClick={handleMyFavorite} alt="" />
                        : <img src={imgFavorite1} onClick={handleMyFavorite} alt="" />
                }
            </div>
        </div>
    )

}

export default Card