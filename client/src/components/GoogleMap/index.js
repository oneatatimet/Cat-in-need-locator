import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

require('dotenv').config();
class GoogleMap extends Component {
	static defaultProps = {
		center: {
			lat: 34.6,
			lng: 135.53,
		},
		zoom: 10,
	};

	render() {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '80vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
					defaultCenter={this.props.center}
					defaultZoom={15}
					yesIWantToUseGoogleMapApiInternals
				></GoogleMapReact>
			</div>
		);
	}
}

export default GoogleMap;
