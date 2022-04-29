import React from 'react'

const Loading = (props) => (
    <div className="center">
        <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
)

export default Loading;