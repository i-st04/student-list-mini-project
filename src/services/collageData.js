import { getData } from "./request";


export const fetchCollageList = async () => {
    const url = '/api/?action=get_colleges';
    try {
        const fetchedData = await getData(url);
        const collageList = fetchedData.data; 

        return collageList;
    } catch (error) {
        console.error('Error fetching collage list:', error);
    }
};

export const loadCollageList = async (setState) => {// gets the State setting function
    try {
        const fetchedCollageList = await fetchCollageList();
        setState(fetchedCollageList); 
    } catch (error) {
        console.error('Error fetching collage list:', error);
    }
};

