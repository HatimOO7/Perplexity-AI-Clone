import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Clock, Link, Send } from 'lucide-react';
import moment from 'moment';
import React from 'react';

function Header({ searchInputRecord }) {
    return (
        <div className="p-4 border-b relative">
            {/* Container for all items */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Top Left: Time + User */}
                <div className="flex items-center gap-3 md:order-1">
                    <UserButton />
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-5 w-5" />
                        <span>{moment(searchInputRecord?.created_at).fromNow()}</span>
                    </div>
                </div>

                {/* Center: Search Text */}
                <div className="text-center md:order-2 w-full">
                    <h2 className="text-base font-medium line-clamp-1">
                        {searchInputRecord?.searchinput}
                    </h2>
                </div>

                {/* Top Right (Desktop) or Bottom Right (Mobile): Buttons */}
                <div className="flex gap-2 justify-end md:justify-start md:order-3">
                    <Button size="sm">
                        <Link className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="flex gap-1 items-center mr-4">
                        <Send className="h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Header;
