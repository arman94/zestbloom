import React from 'react';
import {
    Typography,
    AccordionSummary,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Accordion,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

const CheckboxItem = ({
    title,
    filtered_items,
    filterObj,
    pushOrDeleteValue,
    filtered_type,
    filterByTag,
    setTag,
    setFilterByTag,
    tags,
}) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>
                    {filtered_items.map((x) => {
                        return (
                            <FormControlLabel
                                key={x.value}
                                control={
                                    <Checkbox
                                        color="primary"
                                        checked={
                                            tags
                                                ? filterByTag.includes(x.value)
                                                : filterObj?.[filtered_type]?.includes(x.value)
                                        }
                                        onChange={() => {
                                            tags
                                                ? setTag(setFilterByTag, x.value)
                                                : pushOrDeleteValue(filtered_type, x.value);
                                        }}
                                        name={x.display}
                                    />
                                }
                                label={x.display}
                            />
                        );
                    })}
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default CheckboxItem;
