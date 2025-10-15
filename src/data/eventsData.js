import { useState, useEffect } from 'react';

function useEventsData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/news/posts/')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
                console.log(data);
                
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}

export default useEventsData;

