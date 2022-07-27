import React, { useState } from 'react';

const UrlList = ({ urlList }) => {

    return (
        <>
            {urlList && (
                urlList.map(url => (
                    <React.Fragment key={url._id}>
                        <div className='d-flex'>
                            <div className="full-url">{url.original_url}</div>
                            <div className="full-url">{url.short_url}</div>
                        </div>
                    </React.Fragment>
                ))
            )}
        </>
    )
}

export default UrlList;