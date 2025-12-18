import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
             <div>
                <span className='text-secondary text-2xl md:text-5xl font-normal'>Decor</span><span className='text-primary text-[10px] md:text-xl font-normal'>Nest</span>
            </div>
        </Link>
    );
};

export default Logo;