import React from 'react';
import { WeatherDetails } from './DataTypeInterface';

interface MoreInfoModalProps {
    weatherInfos: WeatherDetails;
    modalBool: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ weatherInfos, modalBool }) => {

    console.log(weatherInfos)

    return (
        <div className='custom-position p-5  bg-slate-700 overflow-y-scroll'>
            <div className='w-full h-auto flex justify-end pb-2'>
                <div
                    onClick={() => { modalBool(prev => !prev) }}
                    className='bg-white w-[30px] h-[30px] rounded-xl text-black flex items-center justify-center cursor-pointer font-bold'>x</div>
            </div>
            <div className='w-full h-[95%] text-black'>
                <div 
                id='remveScrll'
                className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 remveScrll'>
                    <div>
                        <div className='text-left text-white'>
                            Temperature
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.app_temp}°C</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Air Quality Index
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.aqi}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Clouds
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.clouds}%</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Dew Point
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.dewpt}°C</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Diffuse horizontal solar irradiance
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.dhi}W/m^2</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Direct normal solar irradiance
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.dni}W/m^2</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Solar elevation angle
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.elev_angle}°</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Global horizontal solar irradiance
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.ghi}(W/m^2)</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Wind gust speed
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.gust}m/s</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Solar hour angle
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.h_angle}°</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Latitude
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.lat}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                            Longitude
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.lon}</span>
                        </div>
                    </div>



                    <div>
                        <div className='text-left text-white'>
                        Last observation time 
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.ob_time}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Part of the Day (d = day / n = night)
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.pod}</span>
                        </div>
                    </div>


                    <div>
                        <div className='text-left text-white'>
                        Liquid equivalent precipitation rate
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.precip}mm/hr</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Pressure
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.pres} mb</span>
                        </div>
                    </div>



                    <div>
                        <div className='text-left text-white'>
                        Relative Humidity
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.rh}%</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Sea Level Pressure
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.slp} mb</span>
                        </div>
                    </div>


                    <div>
                        <div className='text-left text-white'>
                       Snow
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.snow}mm/hr</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Estimated Solar Radiation
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.solar_rad} W/m^2</span>
                        </div>
                    </div>

                    

                    <div>
                        <div className='text-left text-white'>
                       State Code
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.state_code}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        City Name
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.city_name}</span>
                        </div>
                    </div>
                          

                    <div>
                        <div className='text-left text-white'>
                       Country Code
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.country_code}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Station
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.station}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                       Sunrise
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.sunrise}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Sunset
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.sunset}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Timezone
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.timezone}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        UV Index
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.uv}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Visibility
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.vis} KM</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Abbreviated wind direction
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.wind_cdir}</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Abbreviated wind direction Full
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.wind_cdir_full}</span>
                        </div>
                    </div>


                    <div>
                        <div className='text-left text-white'>
                       Wind Direction
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.wind_dir}°</span>
                        </div>
                    </div>

                    <div>
                        <div className='text-left text-white'>
                        Wind Speed
                        </div>
                        <div className='w-full bg-slate-300 py-2 rounded-lg'>
                            <span>{weatherInfos?.wind_spd}m/s</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MoreInfoModal;
