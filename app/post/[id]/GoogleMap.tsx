"use client";

import React from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    MapCameraChangedEvent,
    Pin
} from '@vis.gl/react-google-maps';

// デフォルトの緯度と経度（例: 東京駅）
const DEFAULT_LATITUDE = 35.681236;
const DEFAULT_LONGITUDE = 139.767125;

type GoogleMapProps = {
    latitude: number | null | undefined;
    longitude: number | null | undefined;
    mapWidth?: string;
    mapHeight?: string;
};

type Poi = { key: string, location: google.maps.LatLngLiteral };

const GoogleMap: React.FC<GoogleMapProps> = ({ latitude, longitude, mapWidth = "100%", mapHeight = "300px" }) => {
    // 緯度・経度が有効でない場合にデフォルト値を使用
    const validLatitude = typeof latitude === 'number' && !isNaN(latitude) ? latitude : DEFAULT_LATITUDE;
    const validLongitude = typeof longitude === 'number' && !isNaN(longitude) ? longitude : DEFAULT_LONGITUDE;

    const locations: Poi[] = [
        { key: "spot1", location: { lat: validLatitude, lng: validLongitude } }
    ];

    return (
        <div style={{ height: mapHeight, width: mapWidth }}>
            <APIProvider
                // apiKey="AIzaSyBMfzoWS9VrllIqFtNGERqBsVknX-9O9fM"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} // 環境変数から API キーを取得
                onLoad={() => console.log("Maps API has loaded.")}
            >
                <Map
                    mapId={"8527f8af06fe26a9"}
                    defaultZoom={16}
                    defaultCenter={{ lat: validLatitude, lng: validLongitude }}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                        console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
                    }
                >
                    <PoiMarkers pois={locations} />
                </Map>
            </APIProvider>
        </div>
    );
};

const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
        <>
            {props.pois.map((poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}>
                    <Pin background={'#F24822'} glyphColor={'#000'} borderColor={'#F24822'} />
                </AdvancedMarker>
            ))}
        </>
    );
};

export default GoogleMap;
