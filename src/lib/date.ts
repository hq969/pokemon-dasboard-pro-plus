import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
// This function would be used in future to calculate the time difference between the current time and the time when the order was fulfilled.
export const timeDiff = (fulfilledTimeStamp: any) => {
    const now: Date = new Date();
    const fulfilled: Date = new Date(fulfilledTimeStamp);
    const difference = Math.abs(now.getTime() - fulfilled.getTime());
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

export const useDocumentTitle = (title: string, prevailOnUnmount: boolean = false) => {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [prevailOnUnmount])
}

export const useIsFavorite = (name: any) => {
    const {favItems} = useSelector((state: any) => state.favLocalStorage);
    return favItems[name] ? true : false;
}
