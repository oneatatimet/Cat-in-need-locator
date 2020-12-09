import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../MapMarker';

class GoogleMap extends Component {
	static defaultProps = {
		center: {
			lat: 34.73,
			lng: 135.431,
		},
		zoom: 15,
	};

	render() {
		const { animalsFoundList, userLat, userLng } = this.props;
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '80vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyB7vD-nlBrgdwptw8Gc5vDl3qEB9KdFhvw' }}
					defaultCenter={this.props.center}
					defaultZoom={15}
					yesIWantToUseGoogleMapApiInternals
				>
					{animalsFoundList &&
						animalsFoundList.length &&
						animalsFoundList.map((item) => <MapMarker lat={item.lat} lng={item.lng} />)}
					<MapMarker position={{ lat: userLat, lng: userLng }} />
				</GoogleMapReact>
			</div>
		);
	}
}

export default GoogleMap;
