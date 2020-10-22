import React, { useEffect, useState } from 'react';
import StoreService from '../../services/store';
import ReactStars from 'react-rating-stars-component';

import styled from 'styled-components';

const RightBar = styled.div`
    color: white;
    position: absolute;
    right: 0;
    top: 0;
    width: 250px;
`;
const Head = styled.div`
    background-color: rgba(10,10,10,0.9);
    border-radius: 6px;
    margin: 10px;
    padding: 2px;
    text-align: center;
`;

const Body = styled.div`
    background-color: rgba(10,10,10,0.9);
    border-radius: 6px;
    height: 450px;
    margin: 10px;
    overflow-y: auto;
    padding: 20px;
`;

const Footer = styled.div`
    background-color: rgba(10,10,10,0.9);
    border-radius: 6px;
    font-size: 13px;
    margin: 10px;
    padding: 10px 20px 20px 20px;
`;

const EstablishmentItem = styled.div`
    cursor: pointer;
`;

const Title = styled.h1`
    color: rgba(220,110,50,0.7);
    font-size: 18px;
`;

const Paragraph = styled.p`
    font-size: 13px;
    line-height: 14px;
`;

const NearestCoffees = (props) => {
    const [stores, setStores] = useState([]);
    
    useEffect(() => {
        loadNearestStores();
    }, [props.latitude]);

    async function loadNearestStores () {
        const response = await StoreService.index(props.latitude, props.longitude);
        setStores(response.data);
    }

    return (
        <RightBar>
            <Head>
                <h3>Find My Coffee</h3>
            </Head>
        ​
            <Body>
                <strong>Mais amados na região</strong>

                <hr />
                {stores.map(store => {
                    return (
                        <EstablishmentItem key={store.name}>
                            <Title>{store.name}</Title>

                            <Paragraph>
                                {store.address}
                            </Paragraph>

                            { store.ratings_count || 0 } Opiniões

                            <ReactStars edit={false} value={store.ratings_average || 0} />

                            <hr/>
                        </EstablishmentItem>
                    );
                })}
            </Body>

            <Footer>
                <h2>OneBitCode.com</h2>

                <Paragraph>
                    Projeto Open Source desenvolvido na Semana Super Full
                    Stack da escola online de programação
                </Paragraph>
            </Footer>
        </RightBar>
    );
}

export default NearestCoffees;