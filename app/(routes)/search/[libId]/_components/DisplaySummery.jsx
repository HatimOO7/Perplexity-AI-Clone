import React from 'react'
import ReactMarkdown from 'react-markdown'


function DisplaySummery({aiResp}) {
  return (
    <div>
      <ReactMarkdown>{aiResp}</ReactMarkdown>
    </div>
  )
}

export default DisplaySummery
