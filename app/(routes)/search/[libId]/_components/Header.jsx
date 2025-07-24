import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Clock, Link, Send } from 'lucide-react';
import moment from 'moment';
import React from 'react';

function Header({ searchInputRecord }) {
    console.log("🔍 Header received:", searchInputRecord);

    return (
        <div className='p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-y-3'>
            
            {/* Left side: User + Time */}
            <div className='flex gap-2 items-center w-full md:w-auto'>
                <UserButton />
                <div className='flex gap-1 items-center'>
                    <Clock className='h-5 w-5 text-gray-500' />
                    <h2 className='text-sm text-gray-500'>
                        {moment(searchInputRecord?.created_at).fromNow()}
                    </h2>
                </div>
            </div>

            {/* Middle: Search Input Text */}
            <h2 className='text-sm md:text-base text-center md:text-left line-clamp-1 max-w-full md:max-w-md w-full'>
                {searchInputRecord?.searchinput}
            </h2>

            {/* Right side: Buttons */}
            <div className='flex gap-2 justify-end w-full md:w-auto'>
                <Button size="sm">
                    <Link className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex gap-1 items-center">
                    <Send className="h-4 w-4" />
                    Share
                </Button>
            </div>
        </div>
    );
}

export default Header;
