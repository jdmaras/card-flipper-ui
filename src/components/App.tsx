import axios from "axios";
import { ReactElement, useState } from "react";
import Deck from "./Deck";
import EmptyDeck from "./EmptyDeck";

//this tells what side of the card to display
export enum CardSide {
  FRONT,
  BACK
}
interface Card {
  suit: string;
  sequence: number;
  name: string;
}

//the type for our response
interface CardResponse {
  data: {
    cardData: {
      //? makes it optional
      card?: Card;
      //we do need to know how many remain
      cardsRemaining: number;
    };
    msg: string;
    error: boolean;
  }
}

//setting the type and importing it
function App(): ReactElement {
  //there won't be more than 52 cards
  //so that's the way of knowing there isn't a deck available for you yet
  //number is a "generic" - saying this state has to be a number
  const [cardsRemaining, setCardsRemaining] = useState<number>(53);
  //string is a "generic" - saying this state has to be a string
  const [flippedCardName, setFlippedCardName] = useState<string>('');

  //when it is run, nothing will be returned because you're just shuffling the deck, so you need to Void
  const shuffleDeck = async (): Promise<void> => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/new-deck`)
    //if there isn't an error, then we will set the deck
    if (!response.data.error) {
      setCardsRemaining(52)
      return;
    }
    //if there is an error, this error message
    console.error(response.data.msg);
  }

  const flipCard = async (): Promise<void> => {
    const response: CardResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/next-card`);
    setCardsRemaining(response.data.cardData.cardsRemaining);

    if (response.data.cardData.card) {
      //set remaining amount of cards
      //setting the drawn card to display it with the card name
      setFlippedCardName(response.data.cardData.card.name)
    }
  }

  const unflipCard = async (): Promise<void> => {
    const response: CardResponse = await axios.put(`${process.env.REACT_APP_API_URL}/api/unflip-card`);
    setCardsRemaining(response.data.cardData.cardsRemaining);

    if (response.data.cardData.card) {
      setFlippedCardName(response.data.cardData.card.name)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#00613e',
      }}
    >
      <div className="draw-pile">
        {/* if more than 52 and less than one, it'll be an empty deck */}
        {cardsRemaining > 52 || cardsRemaining < 1 ? (
          <EmptyDeck clickAction={shuffleDeck} displayText="Shuffle Deck" />
        ) : (
          // if it has less than 52 and more than 1, it will have these options
          <Deck cardSide={CardSide.BACK} clickAction={flipCard} />
        )}
      </div>
      <div className="draw-pile">
        {/* no cards have been flipped yet */}
        {cardsRemaining > 51 ? (
          <EmptyDeck displayText="Flip Cards" />
        ) : (
          <Deck cardSide={CardSide.FRONT}
            clickAction={unflipCard}
            imageName={flippedCardName} />
        )}
      </div>

    </div>
  );
}

export default App;
