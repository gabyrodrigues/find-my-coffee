import React, { useEffect, useState } from 'react';
import Form from './Form';
import ReactStars from "react-rating-stars-component";

import StoreService from '../../../services/store.js';

const Ratings = (props) => {
    const [store, setStore] = useState([]);

    useEffect(() => {
        loadStore();
    }, [props.place]);

    async function loadStore () {
        setStore([]);

        try {
            const response = await StoreService.show(props.place.place_id);
            setStore(response.data);
        } catch (error) {
            setStore([]);
        }
    }

    return (
        <>
            <h4>
                { store.ratings_count || 0 } Opiniões
                { store.ratings_average && <ReactStars edit={false} value={store.ratings_average || 0} /> }
            </h4>
            <hr />

            {
                store.ratings &&
                <div>
                    {store.ratings.map((rating, index) => {
                        return (
                            <div key={index}>
                                <strong>{rating.user_name}</strong>

                                <ReactStars edit={false} value={rating.value} />
                                
                                <p>{rating.opinion}</p>
                                <p>{rating.date}</p>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            }

            <Form place={props.place} loadStore={loadStore} />
        </>
    );
}

export default Ratings;