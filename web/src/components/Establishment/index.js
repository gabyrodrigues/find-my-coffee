import React, { useEffect, useState } from 'react';
import Ratings from './Ratings';

import EstablishmentsService from '../../services/establishmentsService';

import styled from 'styled-components';

const LeftBar = styled.div`
    background-color: rgba(10,10,10,0.9);
    color: white;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    position: absolute;
    width: 250px;
`;

const Title = styled.h1`
    color: rgba(220,110,50,0.7);
    font-size: 20px;
 
`;

const Paragraph = styled.p`
    font-size: 13px;
    line-height: 14px;
`;

const Image = styled.img`
    height: 150px;
    width: 100%;
`;

const Establishment = (props) => {
    const [establishment, setEstablishment] = useState([]);
    const { REACT_APP_GOOGLE_KEY } = process.env;

    async function getEstablishmentDetails() {
        try {
            const response = await EstablishmentsService.show(props.place.place_id);
            setEstablishment(response.data.result);
        } catch (error) {
            setEstablishment([]);
        }
    }

    useEffect(() => {
        getEstablishmentDetails();
    }, [props.place]);

    return (
        <LeftBar>
            {
                (establishment.photos) ?
                    <Image
                        src={
                            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&
                            photoreference=${establishment.photos[0].photo_reference}&sensor=false&
                            key=${REACT_APP_GOOGLE_KEY}`
                        }
                        alt="Coffee photo"
                    />
                    :
                    <Image src="/images/no_photo.jpg" alt="Coffee no photo" />
            }

            <Title>{establishment.name}</Title>

            {
                (establishment.opening_hours) ?
                    <div>
                        {(establishment.opening_hours.open_now === true) ? 'Aberto' : 'Fechado'}

                        <hr />

                        {
                            establishment.opening_hours.weekday_text.map((schedule, index) => {
                                return (<Paragraph key={index}>{schedule}</Paragraph>)
                            })
                        }
                    </div>
                    : <Paragraph>Não há cadastro de dias e horários abertos</Paragraph>
            }

            <hr />

            <Paragraph>
                {establishment.formated_address}
            </Paragraph>

            <Ratings place={props.place} />
        </LeftBar>
    );
}

export default Establishment;