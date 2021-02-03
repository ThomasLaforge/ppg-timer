import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './style.scss'

export default function Home(){
    return <div className="home">
        <h1>PPG Timer</h1>

        <Link to='/creator'>Creator</Link>
    </div>
}