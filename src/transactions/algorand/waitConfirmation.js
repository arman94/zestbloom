export async function waitForConfirmation(algodClient, txId) {
    try {
        let lastround = (await algodClient.status().do())['last-round'];
        while (true) {
            const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
            if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
                //Got the completed Transaction
                console.log('Transaction confirmed in round ' + pendingInfo['confirmed-round']);
                break;
            }
            lastround++;
            await algodClient.statusAfterBlock(lastround).do();
        }
    } catch (err) {
        console.log(err);
    }
}
