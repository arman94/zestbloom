import algosdk from 'algosdk';

import MyAlgo from '@randlabs/myalgo-connect';
import { assignGroupId, combineSignedTxs } from '../util/transactions';
import { getAlgodClient } from 'transactions/algorand';
import { confirmWrapper } from 'components/shared/signConfirmPanel';
import { SIGNATURE_MODAL_INFO } from 'configs';

export const cancelOldContract = async (contract, assetId, account) => {
    try {
        console.log('Start canceling');
        if (!contract) {
            return { status: 'none' };
        }
        const myAlgoWallet = new MyAlgo();
        const algodClient = getAlgodClient();
        const approvalProgram = new Uint8Array(
            Buffer.from(contract.compiled_teal_result, 'base64'),
        );

        const params = await algodClient.getTransactionParams().do();
        params.fee = 1000;
        params.flatFee = true;

        const lSig = algosdk.makeLogicSig(approvalProgram);
        const LSigAddress = lSig.address();
        const info = await algodClient.accountInformation(LSigAddress).do();
        if (info?.amount === 0) {
            return { status: 'revoke' };
        }

        const asset = info?.assets?.find((asset) => asset['asset-id'] === assetId);
        let blob;
        if (asset) {
            const txnCloseOutAsset = {
                ...params,
                from: LSigAddress,
                to: account.address,
                assetIndex: assetId,
                type: 'axfer',
                amount: 0,
                note: new Uint8Array(Buffer.from('...')),
                closeRemainderTo: account.address,
            };
            const txnPayment = {
                ...params,
                from: account.address,
                to: account.address,
                assetIndex: assetId,
                type: 'pay',
                amount: 0,
                note: new Uint8Array(Buffer.from('...')),
            };

            const txnGroup = assignGroupId([txnCloseOutAsset, txnPayment]);

            const txObj = new algosdk.Transaction(txnGroup[0]);
            txObj.group = txnGroup[0].group;
            const signEscrowTx = algosdk.signLogicSigTransactionObject(txObj, lSig);

            const askToSign = await confirmWrapper(SIGNATURE_MODAL_INFO.cancelContract);
            if (!askToSign) throw new Error(SIGNATURE_MODAL_INFO.errorMessage);

            const signedTxn = await myAlgoWallet.signTransaction(txnGroup[1]);
            const combinedTxs = combineSignedTxs([signEscrowTx, signedTxn]);

            blob = btoa(String.fromCharCode.apply(null, combinedTxs));
        }

        return { status: 'revoke', blob };
    } catch (err) {
        console.log(err);
        return { status: 'error', message: err.message };
    }
};
