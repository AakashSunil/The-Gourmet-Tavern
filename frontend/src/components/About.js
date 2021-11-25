import React from 'react';
import { about_page } from '../Helpers/helperString';

export default function About() {
    return (
        <div>
            <h4>{about_page.ABOUT_US}</h4>
            <p>{about_page.ABOUT_US_DESCRIPTION}</p>
        </div>
    )
}
