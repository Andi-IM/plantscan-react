import {getFunctions, httpsCallable} from "firebase/functions";
import {message} from "antd";

const getUserById = async (id) => {
    try {
        const functions = getFunctions();
        const request = httpsCallable(functions, 'getUserById');
        return await request({userId: id});
    } catch (error) {
        // Getting the Error details.
        return message.error({
            content: `Error! : ${error.message}`
        })
    }
}

export default getUserById;