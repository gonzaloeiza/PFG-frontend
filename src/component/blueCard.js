import React from 'react'

const BlueCard = (props) => (
    <div className={`${props.withoutContainer || "container"}`}>
        <div className="row justify-content-center">
            <div className={`${props.className !== undefined ? props.className : 'col-xs-12 col-sm-12 col-md-10 col-lg-9'}`}>
                <div className="card my-5">
                    <div className="card-body cardbody-blue text-center">
                        <div className='row justify-content-center'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default BlueCard;