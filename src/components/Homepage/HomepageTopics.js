import React, { useState } from 'react'
import { FadedBgButton } from '../Buttons/FadedBgButton';
import topics from '../../copies/homepage-topics';

export const HomepageTopics =  () => {
  const [ currentCategory, setCurrentCategory ] = useState(undefined)

  const renderCommonDisorders = (category) => {
    const disorder = topics[category].commonDisorders
    return Object
      .keys(disorder)
      .map(type => {
        return <p className="--textbox-text"><em>{type}</em> {disorder[type]}</p>
      })
  }

  const whitespace = ' '
  const renderTopicContent = (category, idx) => {
    return <div className={`--textbox-content -box-${idx}`}>
      <em>{topics[category].header}</em>
      <p className="--textbox-text"><em>{`Location${whitespace}`}</em>{topics[category].location}</p>
      <p className="--textbox-text"><em>{`Function${whitespace}`}</em>{topics[category].function}</p>
      <p className="--textbox-text"><em>{`Common Problems / Disorders${whitespace}`}</em>{renderCommonDisorders(category)}</p>
      <p className="--textbox-text"><em>{`Fun Facts${whitespace}`}</em>{topics[category].funFacts}</p>
    </div>
  }

  return (
    <section className="HomepageTopics --container">
      {
        Object.keys(topics).map((category, idx) => {
          return <div className="--topics-container">
            <div className="--button-container">
              <FadedBgButton
                buttonText={category} 
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentCategory(currentCategory === category ? undefined : category)
                }}
              />
            </div>
            {
              category === currentCategory &&
              <div className={`--textbox-container`}>
                {renderTopicContent(category, idx)}
              </div>
            }
          </div>
        })
      }
    </section>
  )
}