import React, { useState, useEffect } from 'react'
import Link from '@docusaurus/Link';
import ReactTooltip from "react-tooltip";
import styles from './styles.module.css';

{/* 
  Props:
  id: filename of term
  children (optional): to display different text 
  other than displayText property for term
*/}
export default function Term({ id, children = undefined }) {

  const [uniqueID] = useState(String(Math.random()))
  const [pageReady, setPageReady] = useState(false)

  // Rebuild tooltips on every update
  useEffect(() => {
    ReactTooltip.rebuild()
    setPageReady(true)
  })

  const file = require('../../../docs/terms/terms.md')
  const term = file?.frontMatter?.[id]
  
  if(!term) 
    return null

  const { displayText, hoverSnippet } = term;

  const displayValue = children ? children : displayText ? displayText : id

  return (
    <>
      {pageReady ? (
        <>
          <span
            key={id}
            className={styles.term}
            data-tip
            data-for={uniqueID}
          >
            {/* If component has children, show children text,
              Else, default to displayText frontmatter field,
              Or filename if displayText not set
          */}
            {displayValue}
          </span>
          {hoverSnippet && (
            <ReactTooltip
              id={uniqueID}
              className={styles.termToolTip}
              place="bottom"
              effect="solid"
              wrapper="span"
            >
              {hoverSnippet}
            </ReactTooltip>
          )}
        </>
      ) : (
        <span>{displayValue}</span>
      )}
    </>
  );
}
