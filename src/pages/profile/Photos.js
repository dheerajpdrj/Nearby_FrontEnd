import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux';
import { photosReducer } from '../../functions/reducers';

export default function Photos ({photos}) {

    return (

        <div className="profile_card">
            <div className="profile_card_header">
                Photos
            </div>
            <div className="profile_card_count">
                {photos.total_count === 0 ? ""
                    : photos.total_count === 1 ? "1 Photos"
                        : `${photos.total_count} photos`}
            </div>
            <div className="profile_card_grid">
                {photos.resources && photos.resources.length && photos.resources.slice(0, 9).map((img) => (<div className='profile_photo_card' key={img.public_id}><img src={img.secure_url} alt="" /></div>))}
            </div>
        </div>

    )
}
