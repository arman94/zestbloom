import MyAlgo from '@randlabs/myalgo-connect';
import { confirmWrapper } from 'components/shared/signConfirmPanel';
import { SIGNATURE_MODAL_INFO, NOTIFICATIONS } from 'configs';
import { signTxn } from 'transactions/verifyWallets';

const myAlgoWallet = new MyAlgo();

export async function connectToMyAlgo(
    setWalletsToUser,
    giveNotification,
    toVerifyWallets,
    setConnectLoading = () => {},
) {
    try {
        const accounts = await myAlgoWallet.connect();
        setConnectLoading(true);

        const getWallets = await setWalletsToUser(accounts);

        if (getWallets.length === 0) {
            setConnectLoading(false);
            return;
        }
        const askToSign = await confirmWrapper(SIGNATURE_MODAL_INFO.verifyWallet);
        if (!askToSign) return onCancelModal(getWallets, accounts);
        await signWallet(
            getWallets,
            accounts,
            giveNotification,
            toVerifyWallets,
            setConnectLoading,
        );
    } catch (err) {
        setConnectLoading(false);
        console.error(err);
    }
}

async function signWallet(wallets, accounts, giveNotification, toVerifyWallets, setConnectLoading) {
    try {
        if (wallets.length === 0) return;

        const res = await signTxn(myAlgoWallet, wallets[0]);

        if (!res) return;

        const verify = await toVerifyWallets(res);
        const walletObj = accounts.find((x) => x.address === wallets[0].address);

        if (verify?.status === 200) {
            giveNotification({
                status: NOTIFICATIONS.success.verified.status,
                message: ` "${walletObj.name}" ` + NOTIFICATIONS.success.verified.message,
            });
        } else {
            giveNotification({
                status: NOTIFICATIONS.error.verificationFaild.status,
                message: NOTIFICATIONS.error.verificationFaild.message + ` "${walletObj.name}"`,
            });
        }

        wallets.shift();
        if (wallets.length === 0) return setConnectLoading(false);

        const askToSign = await confirmWrapper(SIGNATURE_MODAL_INFO.verifyWallet);
        if (!askToSign)
            return onCancelModal(wallets, accounts, giveNotification, setConnectLoading);
        signWallet(wallets, accounts);
    } catch (err) {
        onCancelModal(wallets, accounts, giveNotification, setConnectLoading);
        console.log(err);
    }
}

function onCancelModal(wallets, accounts, giveNotification, setConnectLoading) {
    setConnectLoading(false);
    if (wallets.length === 0) return;
    wallets.forEach((wallet) => {
        const walletObj = accounts.find((x) => wallet.address === x.address);
        giveNotification({
            status: NOTIFICATIONS.error.verificationFaild.status,
            message: NOTIFICATIONS.error.verificationFaild.message + ` "${walletObj.name}"`,
        });
    });
}

export async function nonLoggedConnect(setWalletsToUser) {
    try {
        const accounts = await myAlgoWallet.connect({ shouldSelectOneAccount: true });
        return await setWalletsToUser(accounts, false);
    } catch (err) {
        console.log(err);
        return [];
    }
}
