import { ReactElement } from "react";
interface Props {
    //again, ? is it can or cannot be there
    clickAction?: Function;
    displayText: string;
}
//destructuring and passing down props
export default function EmptyDeck(props: Props): ReactElement<Props> {
    const { displayText, clickAction } = props;

    const convertVHToPix = () => {
        return document.documentElement.clientHeight;
    }
    return (
        <div
            style={{
                width: `${convertVHToPix() * 0.5 * 0.688696}px`,
                height: '50vh',
                margin: '0 .78rem',
                border: '4px solid white',
                color: 'white',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Crete Round',
                fontSize: '20px',
                cursor: 'pointer',
            }}
            //if it does exist, click it, if not, it won't do anything
            //we do this because up in the interface we give it the option to not exist 
            onClick={(): void => clickAction && clickAction()}
        //not returning anything, so marking it void
        >
            <p>{displayText.toUpperCase()}</p>

        </div>
    )
}