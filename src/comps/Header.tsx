import axios from 'axios'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { WeatherDataType } from './DataTypeInterface'

import { useData } from './DataContext'
import { useDataAlert } from './AlertContext'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { IoIosHome } from "react-icons/io";
import { MdOutlineGpsFixed } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import WeatherIcon from './WeatherIcon'

const Header: React.FC = () => {
    const { setWeatherData, data } = useData();
    const { setWeatherDataAlert } = useDataAlert();
    const [searchVal, setSearchVal] = useState<string>('');

    useEffect(() => {
            axios.get(`https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${process.env.REACT_APP_SEC_KEY || process.env.REACT_APP_THIRD_KEY}&include=minutely`)
                .then((res) => {
                    if (res.status === 200) {
                        setWeatherData(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            axios.get(`https://api.weatherbit.io/v2.0/alerts?&key=${process.env.REACT_APP_SEC_KEY || process.env.REACT_APP_THIRD_KEY}`)
                .then((res) => {
                    if (res.status === 200) {
                        setWeatherDataAlert(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        
    }, [data, setWeatherData, setWeatherDataAlert]);

    function searchValue(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (searchVal !== '') {
            axios.get(`https://api.weatherbit.io/v2.0/current?city=${searchVal}&key=${ process.env.REACT_APP_SEC_KEY}&include=minutely`)
                .then((res) => {
                    if (res.status === 200) {
                        setWeatherData(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            axios.get(`https://api.weatherbit.io/v2.0/alerts?city=${searchVal}&key=${ process.env.REACT_APP_SEC_KEY}}`)
                .then((res) => {
                    if (res.status === 200) {
                        setWeatherDataAlert(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    const nav = useNavigate()
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)
    const menuElRef = useRef<HTMLDivElement>(null)

    function openMenu() {
        setMenuOpen((prev) => !prev);
        if (menuElRef.current) {
            alert(menuElRef.current);
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
    )
}

export default Header
