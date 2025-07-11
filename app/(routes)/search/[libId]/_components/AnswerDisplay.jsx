import React from 'react';
import Image from 'next/image';
import SourceList from './SourceList';
import DisplaySummery from './DisplaySummery';

function AnswerDisplay({ chat}) {
  

  return (
    <div>
      <div className="flex gap-2 flex-wrap mt-5">
        <SourceList webResult={chat?.searchResult} />
        <DisplaySummery aiResp={chat?.aiResp} />
      </div>
    </div>
  );
}

export default AnswerDisplay;