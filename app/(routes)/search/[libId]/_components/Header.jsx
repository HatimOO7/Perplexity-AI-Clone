import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Clock, Link, Send } from 'lucide-react';
import moment from 'moment';
import React from 'react';

function Header({ searchInputRecord }) {
    console.log("🔍 Header received:", searchInputRecord);

    return (
        <div className='p-4 border-b flex flex-wrap items-center gap-3'>

            {/* Left side: User + Time */}
            <div className='flex gap-2 items-center'>
                <UserButton />
                <div className='flex gap-1 items-center'>
                    <Clock className='h-5 w-5 text-gray-500' />
                    <h2 className='text-sm text-gray-500'>
                        {moment(searchInputRecord?.created_at).fromNow()}
                    </h2>
                </div>
            </div>

            {/* Middle: Search Input Text */}
            <div className='flex-1 text-center md:text-left'>
                <h2 className='text-sm md:text-base line-clamp-1'>
                    {searchInputRecord?.searchinput}
                </h2>
            </div>

            {/* Right side: Buttons (slightly left from full-right) */}
            <div className='flex gap-2 ml-auto'> {/* Changed from ml-auto to ms-6 */}
                <Button size="sm">
                    <Link className="h-4 w-4" />
                </Button>
                <Button size="sm" className="flex gap-1 items-center mr-6">
                    <Send className="h-4 w-4" />
                    Share
                </Button>
            </div>
        </div>
    );
}

export default Header;
