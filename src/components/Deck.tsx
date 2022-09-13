import { ReactElement } from "react";
import { CardSide } from "./App";

interface Props {
    imageName?: string;
    cardSide: CardSide;
    //deck is always card, so you don't have the ? for clickAction not to be there
    clickAction: Function;
}

export default function Deck(props: Props): ReactElement<Props> {
    const { imageName, cardSide, clickAction } = props;

    const imagePath: string = cardSide === CardSide.FRONT
        //ternary statement that displays the enum CardSide.Front to display the image of the card
        //if it doesn't, it will display the card back
        //card name is being fed up from the server
        ? `${process.env.REACT_APP_S3_URL}/${imageName}.png`
        : `${process.env.REACT_APP_S3_URL}/card_back.png`
    return (
        <div
            style={{ height: '50vh', margin: '0 1rem', cursor: 'pointer' }}
            onClick={(): void => clickAction()}
        >
            <img src={imagePath} alt={`${cardSide === CardSide.FRONT && imageName
                //making it more readable by the screenreader
                ? imageName.replace(/_/g, ' ')
                : 'The back of a playing card'}`}
                style={{
                    maxHeight: '100%',
                    border: '1px solid transparent',
                    outline: '4px solid white',
                    borderRadius: '10px',
                }}
            />

        </div>
    )
}
