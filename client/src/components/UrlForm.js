import React, { useState } from 'react';
import Axios from 'axios';

const UrlForm = () => {

    const [url, setUrl] = useState("");
    const [err, setErr] = useState(null);

    const handleUrlInput = (e) => {
        setErr(null);
        setUrl(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axios.post("https://url-chota.herokuapp.com/shorturl", {
                url
            })
        } catch(e) {
            const { response } = e;
            setErr(response.data.error);
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">Enter URL to shorten</div>
                <form className="d-flex" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input value={url} onChange={handleUrlInput} type="text" className="form-control form-input" />
                    </div>
                    <button type="submit" className="form-btn btn btn-primary">Shorten URL</button>
                </form>
                {err && (
                    <small className="d-block text-danger mt-2">{err}</small>
                )}
            </div>
        </div>
    )
}

export default UrlForm;