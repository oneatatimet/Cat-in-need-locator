import { text } from 'body-parser'
import React from 'react'
import mapMarker from "../../assets/images/mapMarker.png"
export default function MapMarker({ props }) {
    return (
        <div>
            {text}
            <img src={mapMarker} height="22px" width="30px" />
        </div>
    )
}
