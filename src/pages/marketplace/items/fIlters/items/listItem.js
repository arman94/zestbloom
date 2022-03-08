import React from 'react';
import {
    Typography,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Accordion,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

const SortItem = ({
    title,
    filtered_items,
    filterObj,
    pushOrDeleteValue,
    filtered_type,
    sort,
    setSort,
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
                <List>
                    {filtered_items.map((x) => {
                        return (
                            <ListItem key={x.value}>
                                <ListItemText
                                    className="filter-listItem"
                                    disableTypography
                                    primary={
                                        <Typography
                                            type="body2"
                                            style={{
                                                color:
                                                    (sort ?? filterObj?.[filtered_type]) === x.value
                                                        ? '#485afd'
                                                        : '#000',
                                            }}
                                        >
                                            {x.display}
                                        </Typography>
                                    }
                                    onClick={() => {
                                        setSort
                                            ? setSort(x.value)
                                            : pushOrDeleteValue(filtered_type, x.value);
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export default SortItem;
