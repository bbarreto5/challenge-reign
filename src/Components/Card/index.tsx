
import "./index.css"
import { Favorite, AccessTime, FavoriteBorder } from '@mui/icons-material';

interface ICard {
    favorite?: boolean;
    date: string;
    description: string;
}

const Card = (props: ICard) => {
    const {
        favorite,
        date,
        description
    } = props


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
                    favorite ? <Favorite onClick={()=>null} htmlColor="red" /> : < FavoriteBorder onClick={()=>null} htmlColor="white" />
                }
            </div>
        </div>
    )

}

export default Card