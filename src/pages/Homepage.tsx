import React, { useEffect, useState } from 'react'
import sampleImage from '../images/4102314_cloud_cloudy_sun_sunny_weather_icon.png'

import cloudySunSunnyWeather from '../images/4102314_cloud_cloudy_sun_sunny_weather_icon.png'
import cloudSunWeather from '../images/4102315_cloud_weather_icon.png'
import cloudDrizzleRainWeather from '../images/4102316_cloud_drizzle_rain_weather_icon.png'
import cloudRainWeather from '../images/4102317_cloud_rain_weather_icon.png'
import cloudHeavyRainStorm from '../images/4102318_cloud_heavy rain_rain_storm_thunderbolt_icon.png'
import cloudLightningStormThunder from '../images/4102319_cloud_lightning_storm_thunderbolt_weather_icon.png'

import crescentHalfMoon from '../images/4102321_crescent_half_half moon_moon_night_icon.png'
import cloudSnowWeather from '../images/4102323_cloud_cold_snow_weather_icon.png'
import cloudSnowWeatherWinter from '../images/4102324_cloud_cold_weather_winter_icon.png'
import hotSummerUmbrella from '../images/4102325_hot_summer_sun_umbrella_weather_icon.png'
import cloudSunnyWeather from '../images/4102326_cloud_sun_sunny_weather_icon.png'
import hotSunWeather from '../images/4102328_hot_sun_weather_icon.png'
import sleetWeather from '../images/2682813_cloud_clouds_cloudy_fog_forecast_icon.png'
import flurriesWeather from '../images/2682819_cloud_cloudy_hail_hail stones_snow_icon.png'
import smokeyWeather from '../images/2682832_cloud_day_forecast_sun_weather_icon.png'

import { useData } from '../comps/DataContext'
import { useDataAlert } from '../comps/AlertContext'

import { WeatherDetails } from '../comps/DataTypeInterface'

import { Chart } from 'react-google-charts';
import axios from 'axios'
import MoreInfoModal from '../comps/MoreInfoModal'


const Homepage: React.FC = () => {
    useEffect(() => {
        const handleResize = () => {
            window.location.reload();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const [previousAlerts, setPreviousAlerts] = useState<any[]>([]);

    useEffect(() => {
        const requestNotificationPermission = async () => {
            if (localStorage.getItem('notificationPermission') === null) {
                const permission = await Notification.requestPermission();
                localStorage.setItem('notificationPermission', permission);
            }
        };
        requestNotificationPermission();
    }, []);


    const [seeModal, setSeeModal] = useState<boolean>(false)
    const datas = useDataAlert()
    const alertData = datas?.data

    const { data } = useData()
    const WeatherData = data?.data[0] as WeatherDetails

    const [alertDatas, setAlertData] = useState<any>(null);




    useEffect(() => {
        axios.get(`https://api.weatherbit.io/v2.0/alerts?lat=35.7796&lon=-78.6382&key=${process.env.REACT_APP_THIRD_KEY}`)
            .then((res) => {
                if (res.status === 200) {
                    setAlertData(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (alertDatas?.alerts) {
            const intervalId = setInterval(() => {
                if (alertDatas.alerts.length > previousAlerts.length) {
                    const newAlert = alertDatas.alerts.find((alert: any) => !previousAlerts.includes(alert));
                    if (newAlert) {
                        showNotification(newAlert);
                    }
                    setPreviousAlerts(alertDatas.alerts);
                }
            }, 60000); // 60 seconds
            return () => clearInterval(intervalId);
        }
    }, [alertDatas, previousAlerts]);

    const showNotification = (alert: any) => {
        if (Notification.permission === 'granted') {
            new Notification(alert.title, {
                body: alert.description,
                icon: sampleImage
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(alert.title, {
                        body: alert.description,
                        icon: sampleImage
                    });
                }
            });
        }
    };


    if (!data || !WeatherData?.weather) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#000">
                <g fill="none" fill-rule="evenodd" stroke-width="2">
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
        </div>;
    }


    const weather = WeatherData.weather;
    const infoData = [
        ['Metric', 'Value', { role: 'style' }],
        ['Clouds Coverage (%)', WeatherData?.clouds, 'color: #76A7FA'],
        ['Wind Direction (deg)', WeatherData?.wind_dir, 'color: #76A7FA'],
        ['Pressure (mb)', WeatherData?.pres, 'color: #76A7FA'],
        ['Sea Level Pressure (mb)', 1021, 'color: #76A7FA'],
    ];

    const options = {
        title: 'Weather Metrics',
        chartArea: { width: '80%' },
        hAxis: {
            title: 'Value',
            minValue: 0,
        },
        vAxis: {
            title: 'Metric',
        },
        seriesType: 'bars',
        series: {
            6: { type: 'line' },
        },
        annotations: {
            alwaysOutside: true,
        },
        backgroundColor: '#fafafc',
    };


    const chartData = [
        ['Metric', 'Value'],
        ['Precipitation (%)', WeatherData?.precip],
        ['UV Index', WeatherData?.uv],
        ['Air Quality Index', WeatherData?.aqi],
    ];

    const newOption = {
        title: 'Weather Metrics',
        pieHole: 0.4,
        backgroundColor: '#fafafc',
        slices: {
            0: { offset: 0.1 },
            1: { offset: 0.1 },
            2: { offset: 0.1 },
            3: { offset: 0.1 },
        },
        pieSliceText: 'label',
        legend: {
            position: 'bottom',
            alignment: 'center',
        },
        tooltip: {
            showColorCode: true,
            textStyle: { color: '#000' },
        },
        colors: ['#76A7FA', '#ff9999', '#99ff99', '#ffcc99'],
    };


    const getWeatherDescriptionAndIcon = (weatherCode: number) => {

        switch (weatherCode) {
            case 200:
                return cloudHeavyRainStorm
            case 201:
                return cloudHeavyRainStorm
            case 202:
                return cloudHeavyRainStorm
            case 230:
                return cloudHeavyRainStorm
            case 231:
                return cloudHeavyRainStorm
            case 232:
                return cloudHeavyRainStorm
            case 233:
                return cloudHeavyRainStorm
            case 300:
                return cloudDrizzleRainWeather
            case 301:
                return cloudDrizzleRainWeather
            case 302:
                return cloudDrizzleRainWeather
            case 500:
                return cloudDrizzleRainWeather
            case 501:
                return cloudDrizzleRainWeather
            case 502:
                return cloudRainWeather
            case 511:
                return cloudRainWeather
            case 520:
                return cloudRainWeather
            case 521:
                return cloudRainWeather
            case 522:
                return cloudRainWeather
            case 600:
                return cloudSnowWeather
            case 601:
                return cloudSnowWeather
            case 602:
                return cloudSnowWeatherWinter
            case 610:
                return cloudSnowWeather
            case 611:
                return sleetWeather
            case 612:
                return sleetWeather
            case 621:
                return cloudSnowWeatherWinter
            case 622:
                return cloudSnowWeather
            case 623:
                return flurriesWeather
            case 700:
                return sleetWeather
            case 711:
                return smokeyWeather
            case 721:
                return smokeyWeather
            case 731:
                return smokeyWeather
            case 741:
                return smokeyWeather
            case 751:
                return smokeyWeather
            case 800:
                return hotSunWeather
            case 801:
                return cloudSunnyWeather
            case 802:
                return cloudSunnyWeather
            case 803:
                return cloudSunnyWeather
            case 804:
                return cloudSunWeather
            case 900:
                return cloudHeavyRainStorm
            default:
                return sampleImage
        }


    };


    return (
        <div className={`overflow-x-hidden bg-white h-screen overflow-auto flex ${data ? 'pt-[70px]' : 'pt-0'} p-5`}>

            {
                seeModal &&
                <MoreInfoModal weatherInfos={WeatherData} modalBool={setSeeModal} />
            }
            {
                data ?
                    <div className='flex flex-col md:flex-row w-full gap-2 pb-2'>
                        <section className='pt-5 h-full w-auto'>
                            <section className='bg-[#fafafc] rounded-[20px] w-full max-w-[100%] p-5 flex items-start flex-col h-full md:max-w-[400px]'>
                                <div className='flex justify-between gap-5 h-auto w-full'>
                                    <div>{WeatherData?.city_name}, {WeatherData?.country_code}</div>
                                    <div className='font-normal'>
                                        {WeatherData?.state_code}
                                    </div>
                                </div>
                                <div className='w-full text-center font-medium pt-5'>
                                    {WeatherData?.timezone}
                                </div>
                                <div className='w-full h-full max-h-[200px] max-w-[200px] flex self-center pt-3'>
                                    <img
                                        className='w-full h-full object-cover'
                                        src={getWeatherDescriptionAndIcon(WeatherData?.weather?.code)} alt="" />
                                </div>
                                <div className='h-auto  w-full font-medium text-yellow-500 flex items-center justify-center'>
                                    <div className='text-base sm:text-3xl md:text-4xl lg:text-7xl'>
                                        {WeatherData?.app_temp}°C
                                    </div>
                                </div>
                                <p className='text-[#888] w-full flex items-center justify-center'>
                                    {weather?.description}
                                </p>

                                <section className="grid grid-cols-2 gap-2 pt-5 w-full border-b-2 border-gray-400 pb-3">

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Wind Speed:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.wind_spd} m/s
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Wind Direction:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.wind_dir}°
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Pressure:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.pres} mb
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Humidity:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.rh}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Precip:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.precip}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            UV index:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.uv}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Air Quality:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.aqi}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='text-left pl-2'>
                                            Visibility:
                                        </span>
                                        <div className='bg-gray-300 py-2 px-6 rounded-xl w-full items-center justify-center'>
                                            <div className='flex gap-1'>
                                                {WeatherData?.vis} Km
                                            </div>
                                        </div>
                                    </div>

                                    <section>
                                        <div className='text-left pl-2'>sources:</div>

                                        <div className='flex gap-1 items-center'>
                                            {WeatherData?.sources.map((itm: string, index: number) => (
                                                <div className='bg-gray-300 py-1 px-2 rounded-lg'>
                                                    {itm}
                                                </div>

                                            ))}
                                        </div>
                                    </section>


                                </section>
                                <div className='w-full h-full pt-5'>
                                    <button
                                        onClick={() => {
                                            setSeeModal(prevClick => !prevClick)
                                        }}
                                        className='w-full  bg-slate-700 text-white rounded-xl h-[50px]'>
                                        More Info
                                    </button>
                                </div>

                            </section>
                        </section>



                        <section className='w-full h-full mt-5 rounded-lg'>
                            <div className='flex items-center justify-center flex-col gap-2 w-full h-full max-h-[100%] customOne:max-h-[400px] customOne:flex-row'>
                                <div className='w-full h-full overflow-hidden rounded-lg flex items-center justify-center'>
                                    <Chart
                                        chartType="ComboChart"
                                        width="100%"
                                        height="100%"
                                        data={infoData}
                                        options={options}

                                    />
                                </div>
                                <div className='w-full h-full overflow-hidden rounded-lg'>
                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        height="400px"
                                        data={chartData}
                                        options={newOption}
                                    />
                                </div>
                            </div>
                            <div className='flex items-center justify-center flex-col gap-2 w-[100%] h-[50%] pt-5 customOne:flex-row'>
                                <div className='w-full h-full  bg-slate-500 rounded-xl overflow-hidden flex flex-col gap-1 p-2 overflow-y-scroll'>
                                    <div className='pt-5 text-white'>
                                        Weather Alerts
                                    </div>
                                    {
                                        alertData?.alerts.length === 0 &&
                                        <div
                                            className='bg-[#fafafc] p-2 rounded-xl'
                                        >
                                            No Alerts
                                        </div>
                                    }
                                    {
                                        alertData?.alerts?.map((itm, index) => (
                                            <div
                                                className='bg-[#fafafc] p-2 rounded-xl'
                                                key={index}>
                                                <div className='text-left pb-1'>
                                                    {itm?.title}
                                                </div>
                                                <div className='text-left pb-2'>
                                                    severity: <span>{itm?.severity}</span>
                                                </div>
                                                <p className='text-[13px] text-[#888] text-justify'>
                                                    {itm?.description}
                                                </p>


                                                <div className='flex gap-1 py-1 items-center'>
                                                    <div>
                                                        Affected Regions:
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        {
                                                            itm?.regions.map((reg, index) => (
                                                                <div className='bg-gray-700 p-1 text-white rounded-md' key={index}>
                                                                    {reg}
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                                <div className='flex flex-col text-left'>
                                                    <div>
                                                        <div>
                                                            alert issued on: <span>{itm?.effective_local}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    onClick={() => {
                                                        window.open(itm?.uri, "_blank")
                                                    }}
                                                    className='text-left pt-3 text-blue-700 cursor-pointer'>
                                                    <div>
                                                        {itm?.uri}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='w-full h-full  bg-slate-700 rounded-xl overflow-y-scroll mb-5'>
                                    <div className='pt-5 text-white'>
                                        Weather History
                                    </div>
                                    {
                                        data?.minutely.length === 0 &&
                                        <div
                                            className='bg-[#fafafc] p-2 rounded-xl'
                                        >
                                            No History
                                        </div>
                                    }
                                    <div className='grid grid-cols-1 gap-1 p-2 md:grid-cols-2 lg:grid-cols-3'>
                                        {
                                            data.minutely.length > 0 &&
                                            data?.minutely.map((ups, index) => (
                                                <div
                                                    className='w-full h-full bg-[#fafafc] py-2 rounded-lg flex items-center gap-1 px-2 justify-between'
                                                    key={index}>
                                                    <div className='text-2xl font-bold '>
                                                        {ups.temp}°C
                                                    </div>
                                                    <div>
                                                        {ups?.timestamp_utc}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    :
                    <div className='h-full w-full flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" stroke="#000">
                            <g fill="none" fill-rule="evenodd" stroke-width="2">
                                <circle cx="22" cy="22" r="1">
                                    <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                                    <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                                </circle>
                                <circle cx="22" cy="22" r="1">
                                    <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />
                                    <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite" />
                                </circle>
                            </g>
                        </svg>
                    </div>
            }

        </div>
    )
}

export default Homepage
