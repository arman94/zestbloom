import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';

import { HeadphoneIcon, FilmIcon, ArtIcon, SpeakerIcon, CubeIcon, BookWhiteIcon } from 'assets/img';

const services = [
    { caption: 'virtual reality', icon: CubeIcon, url: '/', color: 'green' },
    { caption: 'audiobooks', icon: SpeakerIcon, url: '/', color: 'gold' },
    { caption: 'art', icon: ArtIcon, url: '/', color: 'blue' },
    { caption: 'film', icon: FilmIcon, url: '/', color: 'red' },
    { caption: 'music', icon: HeadphoneIcon, url: '/', color: 'orange' },
    { caption: 'literature', icon: BookWhiteIcon, url: '/', color: 'gray' },
];

const Products = () => {
    const history = useHistory();
    return (
        <div className="home-product relative desktop-only">
            <div className="home-product-bg" />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="space-evenly"
                flexDirection="row"
            >
                {services.map((service, i) => (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        className={`bg-brand-${service.color}`}
                        onClick={() => service?.url && history.push(service.url)}
                        mx={2}
                        style={{
                            width: 208,
                            height: 192,
                            position: 'relative',
                            boxShadow: '0px 24px 60px rgba(38, 43, 63, 0.15)',
                            borderRadius: 10,
                        }}
                        key={i}
                    >
                        <service.icon />

                        <p
                            style={{
                                marginTop: 20,
                                fontSize: 18,
                                textTransform: 'uppercase',
                                color: 'white',
                            }}
                        >
                            {service.caption}
                        </p>
                        {service?.url && (
                            <ChevronRight
                                style={{
                                    color: '#fff',
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </div>
    );
};

export default Products;
