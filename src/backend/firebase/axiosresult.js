import axios from 'axios'

export default axios.create(
    {
        baseURL: "https://clicker-defence-default-rtdb.europe-west1.firebasedatabase.app/"
    }
)