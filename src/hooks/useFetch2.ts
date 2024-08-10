import {useEffect, useState} from 'react';


function UseFetch2(url: string) {

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        // console.log(`URL: ${url}`)

        const controller: AbortController = new AbortController();
        const signal: AbortSignal = controller.signal;

        const fetchData = async () => {

            // console.log('fetching data ..')
            setIsLoading(true)
            fetch(url, {signal})
                .then((response) => {
                    if (!response.ok) {
                        // console.log(`response: ${response} `)
                        throw Error('CanNot fetch data from this resource')
                    }

                    return response.json();
                })
                .then((result) => {
                    // console.log(`setting data 1 ...`)
                    setData(result);
                    setError(null)

                    return result;
                })
                .then((result) => new Promise(resolve => setTimeout(() => {
                    resolve(result);
                }, 5000)))
                .catch(error => {
                    console.log(`catching error ... `)
                    if (error.name === 'AbortError') {
                        // console.log(`catching error [AbortError] ... `)
                        // console.error(error);   // should be ignored
                    } else {
                        setError(error)
                    }
                }).finally(() => {
                setIsLoading(false);
            })
        };

        fetchData();

        // clean up function, to cancel the previous run of useEffect
        return () => {
            // console.log(`inside clean-up func `)
            controller.abort();
        }
    }, [url]);

    return { data, isLoading, error}
}


function wait(ms: number, value: any) {
    return new Promise(resolve => setTimeout(resolve, ms, value));
}
export default UseFetch2;