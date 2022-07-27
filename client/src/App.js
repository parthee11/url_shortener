import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.scss'
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import Axios from "axios";

const App = () => {

    const [urlList, setUrlList] = useState(null);

    useEffect(() => {
        fetchUrlList();
    }, [])

    const fetchUrlList = async () => {
        try {
            const response = await Axios.get("https://url-chota.herokuapp.com/shorturl");
            setUrlList(response.data)
        } catch(e) {
            console.log("Error fetching urls")
        }
    }
 
    return (
        <div className="container-fluid">
            <h2>Url Chota</h2>
            <UrlForm />
            <UrlList urlList={urlList} />
        </div>
    )
}

export default App;