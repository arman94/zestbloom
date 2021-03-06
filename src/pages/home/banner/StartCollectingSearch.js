import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Search } from '@material-ui/icons';
import { FormControl, OutlinedInput, InputAdornment, Button } from '@material-ui/core';
import { setValueSearchFromHome } from 'redux/marketplace/actions';
import useWindowDimensions from 'hooks/useWindowDimensions';
import ArrowRight from 'assets/img/arrow-right.svg';

const StartCollectingSearch = ({ id }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const { isMobile } = useWindowDimensions();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setValueSearchFromHome(value));
        history.push('/marketplace');
    };

    return (
        <form className="search-group-alt" id={id} onSubmit={handleSubmit}>
            {isMobile ? (
                <>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            className="search-box"
                            placeholder="art, artist, collector"
                            onChange={handleChange}
                            value={value}
                        />
                    </FormControl>
                    <Button type="submit">
                        <Search fontSize="large" />
                    </Button>
                </>
            ) : (
                <>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            placeholder="Search Collection"
                            onChange={handleChange}
                            value={value}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button variant="text" type="submit">
                                        <img src={ArrowRight} alt={'submit'} />
                                    </Button>
                                </InputAdornment>
                            }
                        ></OutlinedInput>
                    </FormControl>
                </>
            )}
        </form>
    );
};

export default StartCollectingSearch;
