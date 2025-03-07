import React  from 'react';
import LazyLoad from 'react-lazy-load';
import { FadedBgButton } from '../Buttons/FadedBgButton';
import { Modal } from '../Assorted/Modal';
import topics from '../../copies/homepage-topics';

export const HomepageTopics =  ({ topic, setTopic, closeOverlappingModal }) => {
  const renderLeftPane = (category) => {
    return (
      <div className="--left-pane">
        <p className="--minus-margin"><em>Basic Spine Anatomy </em> {topics[category].basicSpineAnatomy}</p>
        <p><em>Pathology </em>{topics[category].pathology}</p>
        <p><em>Clinical Conditions </em>{topics[category].clinicalConditions}</p>
        <p><em>Physical Exam Items </em>{topics[category].physicalExamItems}</p>
        <p><em>Treatment Options </em>{topics[category].treatmentOptions}</p>
        <p><em>Fun Fact </em>{topics[category].funFact}</p>
      </div>
    )
  }

  const renderRightPane = (category) => {
    return (
      <div className="--right-pane">
        <LazyLoad>
          <img src={topics[category].imageURL} alt={topics[category].header}/>
        </LazyLoad>
      </div>
    )
  }

  return (
    <section className="HomepageTopics">
      <div className="--content-container">
        {
          Object.keys(topics).map((category, index) => {
            return <div key={index} className="--topics-container">
              <div className="--button-container">
                <FadedBgButton
                  isFocused={category === topic}
                  buttonText={category} 
                  onClick={(e) => {
                    e.preventDefault()
                    setTopic(topic === category ? undefined : category)
                    closeOverlappingModal()
                  }}
                  width="300px"
                />
              </div>
              
              <Modal index={index}
                isOpen={category === topic}
                onClose={() => setTopic(undefined)}
                header={topics[category].header}
                scrollable
              >
                <div className="--panes-container">
                  {renderLeftPane(category)}
                  {renderRightPane(category)}
                </div>
              </Modal>
            </div>
          })
        }
      </div>
    </section>
  )
}