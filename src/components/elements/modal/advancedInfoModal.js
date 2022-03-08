import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Dialog, Typography } from '@material-ui/core';
import SimpleTable from '../../shared/Table';
import { setNotification } from 'redux/profile/actions';
import { NOTIFICATIONS } from 'configs';

const AdvancedInfoModal = ({
    open,
    close,
    defaultFrozen,
    assetAttributes,
    setAttributes,
    changeExistsAttributes,
    deleteAttributes,
    assetContributors,
    setContributors,
    changeExistsContributor,
    deleteContributor,
    assetManager,
    clawbackAddress,
    setClawbackAddress,
    freezeAddress,
    setFreezeAddress,
}) => {
    const dispatch = useDispatch();

    const openAddAtributes = () => {
        const emptyFields = { trait_type: '', value: '' };
        setAttributes(emptyFields);
    };
    const openAddContributors = () => {
        if (assetContributors.length && !assetContributors[assetContributors.length - 1].username) {
            return dispatch(setNotification(NOTIFICATIONS.info.fillContributor));
        }
        const emptyFields = { username: '', avatar: null, type: '', isOpen: false };
        setContributors(emptyFields);
    };

    return (
        <>
            <Dialog open={open} onClose={close} scroll="body" maxWidth="md" className="mini-modal">
                <Box className="modal-body advanced-settings">
                    <Typography className="advanced-settings-title">Advanced Settings</Typography>
                    <SimpleTable
                        defaultFrozen={defaultFrozen}
                        assetAttributes={assetAttributes}
                        changeExistsAttributes={changeExistsAttributes}
                        deleteAttributes={deleteAttributes}
                        assetContributors={assetContributors}
                        changeExistsContributor={changeExistsContributor}
                        deleteContributor={deleteContributor}
                        assetManager={assetManager}
                        clawbackAddress={clawbackAddress}
                        setClawbackAddress={setClawbackAddress}
                        freezeAddress={freezeAddress}
                        setFreezeAddress={setFreezeAddress}
                    />

                    <Box gridGap={20} display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            className="add-attribute-button"
                            onClick={openAddAtributes}
                        >
                            Add Attribute
                        </Button>
                        <Button
                            disabled={assetContributors.length >= 4}
                            variant="contained"
                            color="secondary"
                            size="large"
                            className="add-attribute-button"
                            onClick={openAddContributors}
                        >
                            Add Contributor
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};

export default AdvancedInfoModal;
