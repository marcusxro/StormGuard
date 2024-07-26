import axios from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { WeatherDataType } from './DataTypeInterface';

import { useData } from './DataContext';
import { useDataAlert } from './AlertContext';
import WeatherIcon from './WeatherIcon';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { IoIosHome } from "react-icons/io";
import { MdOutlineGpsFixed } from "react-icons/md";
import { IoIosContact } from "react-icons/io";

const fetchWeatherData = async (cityOrLat: string | number, keys: string[], lon?: number, index = 0): Promise<any> => {
    if (index >= keys.length) {
        throw new Error('All API keys have been exhausted');
    }

    const params = typeof cityOrLat === 'string'
        ? { city: cityOrLat, key: keys[index], include: 'minutely' }
        : { lat: cityOrLat, lon: lon!, key: keys[index], include: 'minutely' };

    try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/current', { params });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: Received status code ${response.status}`);
        }
    } catch (error) {
        console.log(`API key at index ${index} failed. Trying the next key...`);
        return fetchWeatherData(cityOrLat, keys, lon, index + 1);
    }
};

const fetchWeatherAlerts = async (cityOrLat: string | number, keys: string[], lon?: number, index = 0): Promise<any> => {
    if (index >= keys.length) {
        throw new Error('All API keys have been exhausted');
    }

    const params = typeof cityOrLat === 'string'
        ? { city: cityOrLat, key: keys[index] }
        : { lat: cityOrLat, lon: lon!, key: keys[index] };

    try {
        const response = await axios.get('https://api.weatherbit.io/v2.0/alerts', { params });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error: Received status code ${response.status}`);
        }
    } catch (error) {
        console.log(`API key at index ${index} failed. Trying the next key...`);
        return fetchWeatherAlerts(cityOrLat, keys, lon, index + 1);
    }
};

const Header: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { setWeatherData, data } = useData();
    const { setWeatherDataAlert } = useDataAlert();
    const [searchVal, setSearchVal] = useState<string>('');
    const keys = [
        process.env.REACT_APP_API_KEY,
        process.env.REACT_APP_SEC_KEY,
        process.env.REACT_APP_THIRD_KEY,
    ].filter(key => key !== undefined) as string[];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (err) => {
                    setError('Failed to retrieve location. Please enable location services and refresh the page.');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (location && !data) {
            fetchWeatherData(location.lat, keys, location.lon)
                .then(setWeatherData)
                .catch(console.error);

            fetchWeatherAlerts(location.lat, keys, location.lon)
                .then(setWeatherDataAlert)
                .catch(console.error);
        }
    }, [location, data, setWeatherData, setWeatherDataAlert, keys]);

    function searchValue(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (searchVal !== '') {
            fetchWeatherData(searchVal, keys)
                .then(setWeatherData)
                .catch(console.error);

            fetchWeatherAlerts(searchVal, keys)
                .then(setWeatherDataAlert)
                .catch(console.error);
        }
    }

    const nav = useNavigate()

    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
    const menuElRef = useRef<HTMLDivElement>(null)

    function openMenu() {
        setMenuOpen((prev) => !prev);
        // Ensure the ref is not null
        if (menuElRef.current) {
            alert(menuElRef.current); // Check if ref is properly set
            gsap.to(menuElRef.current, {
                right: isMenuOpen ? '-500px' : '0px',
                ease: 'bounce',
                duration: 0.4,
            });
        }
    }



    return (
        <React.Fragment>
            {
                isMenuOpen &&
                <div
                    id='#menuRef'
                    ref={menuElRef}
                    className='menuEl'>
                    <div className='gagag w-full flex justify-start '>
                        <div
                            onClick={() => { setMenuOpen(false) }}
                            className='bg-slate-700 w-[40px] h-[40px] rounded-full flex items-center justify-center text-white cursor-pointer'>x</div>
                    </div>

                    <div className='flex flex-col pt-4 px-3 text-left gap-2'>
                        <div
                            onClick={() => { nav('/'); setMenuOpen(false) }}
                            className='flex gap-1 text-lg font-medium py-2 bg-slate-500 cursor-pointer px-2 items-center text-white rounded-lg'>
                            <span className='flex items-center pb-[1.5px]'><IoIosHome /></span>
                            Home
                        </div>
                        <div
                            onClick={() => { nav('/live-tracker'); setMenuOpen(false) }}
                            className='flex gap-1 text-lg font-medium py-2 bg-slate-500 cursor-pointer px-2 items-center text-white rounded-lg'>
                            <span className='flex items-center pb-[1.5px]'><MdOutlineGpsFixed /></span>
                            Tracker
                        </div>
                        <div className='flex gap-1 text-lg font-medium py-2 bg-slate-500 cursor-pointer px-2 items-center text-white rounded-lg'>
                            <span className='flex items-center pb-[1.5px]'>       <IoIosContact /></span>

                            Contact
                        </div>
                    </div>
                </div>
            }

            <header className='fixed top-0 left-0 w-full flex justify-between px-5 py-3 items-center gap-5 custom-background'>
                {
                    data &&
                    <React.Fragment>
                        <div
                            onClick={() => { nav('/') }}
                            className='font-bold flex items-center cursor-pointer'>
                            <span className='flex items-center justify-center pb-[4px]'><WeatherIcon /></span> StormGuard
                        </div>

                        <div className='w-full max-w-[400px] flex gap-3 items-center'>
                            <form
                                className='w-[100%]'
                                onSubmit={searchValue}
                                action="submit">
                                <input
                                    onChange={(e) => { setSearchVal(e.target.value) }}
                                    value={searchVal}
                                    className='p-2 rounded-xl outline-none border-gray-400 border-2 bg-transparent w-full'
                                    type="text"
                                    required
                                    placeholder='🔍 Search Your City, Country' />
                            </form>
                            <div
                                onClick={() => { openMenu() }}
                                className='flex flex-col gap-[3px] rounded-full cursor-pointer bg-slate-700 h-[40px] w-[40px] items-center justify-center'>
                                <div className='h-[3px] w-[21px] bg-white'></div>
                                <div className='h-[3px] w-[21px] bg-white'></div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </header>
        </React.Fragment>
    );
};

export default Header;

