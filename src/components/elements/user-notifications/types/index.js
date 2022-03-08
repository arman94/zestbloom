import React from 'react';

// import AuctionNotification from './auction';
// import ActionBySomeone from './bySomeone';
// import MakeNew from './makeNew';
// import PlaceABid from './placeABid';
import ActionsWithAsset from './actionsWithAsset';

const Notificationitem = ({ data, setNotifications }) => {
    return <ActionsWithAsset data={data} setNotifications={setNotifications} />;
};

export default Notificationitem;
