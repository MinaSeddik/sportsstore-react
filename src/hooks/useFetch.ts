import {useEffect, useReducer} from 'react';

type FetchState = {
    data?: any | null;
    isLoading: boolean;
    error?: Error | string | null;
}

type FetchAction = {
    type: 'FETCH_START' | 'FETCH_SUCCESS' | 'FETCH_FAIL';
    payload?: any;
}

const FETCH_INIT_STATE: FetchState = {
    data: null,
    isLoading: false,
    error: null
}

function fetchReducer(state: FetchState, action: FetchAction) {

    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                isLoading: true,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            }
        case 'FETCH_FAIL':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
    }
}


function UseFetch(url: string) {

    // const [data, setData] = useState<any>(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const [state, dispatch] =
        useReducer(fetchReducer, FETCH_INIT_STATE);

    useEffect(() => {
        console.log(`URL: ${url}`)

        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;


        dispatch({type: 'FETCH_START'});
        fetch(url, {signal})
            .then((response) => {
                if (!response.ok) {
                    console.log(`response: ${response} `)
                    throw Error('CanNot fetch data from this resource')
                }

                return response.json();
            })
            .then((result) => {
                console.log(`setting data ...`)
                // setData(result);
                // setError(null)
                dispatch({type: 'FETCH_SUCCESS', payload: result});
            })
            .catch(error => {
                console.log(`catching error ... `)
                if (error.name === 'AbortError') {
                    console.log(`catching error [AbortError] ... `)
                    console.error(error);   // should be ignored
                } else {
                    // setError(error)
                    dispatch({type: 'FETCH_FAIL', payload: error});
                }
            }).finally(() => {
            // setIsLoading(false);
        })

        // clean up function, to cancel the previous run of useEffect
        return () => {
            // console.log(`inside clean-up func `)
            controller.abort();
        }
    }, [url]);

    console.log(`data: ${JSON.stringify(state.data)}`)
    return state;
}

export default UseFetch;