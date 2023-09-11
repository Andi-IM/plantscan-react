import {getFunctions, httpsCallable} from 'firebase/functions';
import {message} from "antd";

const getUsers = async () => {
    try {
        const functions = getFunctions();
        const request = httpsCallable(functions, 'getusers');
        return await request({});
    } catch (error) {
        // Getting the Error details.
        return message.error({
            content: `Error! : ${error.message}`
        })
    }
}

export default getUsers;