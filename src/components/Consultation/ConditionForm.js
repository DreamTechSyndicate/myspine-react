import React, { useContext } from "react"
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../../copies/homepage-form-options'
import { PatientContext } from "../../contexts"
import { InputContainer } from "."

export const ConditionForm = () => {
  const { 
    singleOption,
    multipleOptions,
    selectSingleOption,
    selectMultipleOptions
  } = useContext(PatientContext)

  const isSingleSelected = (option) => {
    return singleOption === option ? '--selected' : ''
  }

  const isMultipleSelected = (option) => {
    return multipleOptions.includes(option) ? '--selected' : ''
  }

  // const determineSingleOption = (option) => {
  //   if (!singleOption || singleOption !== option) {
  //     return option
  //   } else {
  //     return singleOption === option ? '' : singleOption
  //   }
  // }

  const determineMultipleOptions = (option) => {
    selectMultipleOptions(prevState => {
      if (isMultipleSelected(option)) {
        return prevState.filter(op => op!== option)
      } else {
        return [...prevState, option]
      }
    })
  }

  const determineSingleOption = (option) => {
    if (singleOption === option) {
      return '';
    } else {
      return option;
    }
  };
  
  // const determineMultipleOptions = (option) => {
  //   if (multipleOptions.includes(option)) {
  //     return multipleOptions.filter(op => op !== option);
  //   } else {
  //     return [...multipleOptions, option];
  //   }
  // }

  return <section className="ConditionForm">
     <div className="--options-container">
        <p><i>Please select <em>one</em> of the following:</i></p>
        {
          Object.keys(singleSelectOption).map((option, index) => {
            return <div key={index} className='--option-container'>
              <div 
                className={`--checkbox --button ${isSingleSelected(option)}`} 
                onClick={(e) => {
                  e.preventDefault()
                  selectSingleOption(determineSingleOption(option))
                }}/>
              <p className={`--checkoption ${isSingleSelected(option)}`}>
                {singleSelectOption[option]}
              </p>
            </div>
          })
        }
      </div>

      <div className="--options-container">
        <p><i>-OR- select <em>one or more</em> of the following:</i></p>
        {
          Object.keys(multipleSelectOptions).map((option, index) => {
            return <div key={index} className='--option-container'>
              <div 
                className={`--checkbox --button ${isMultipleSelected(option)}`} 
                onClick={(e) => {
                  e.preventDefault()
                  determineMultipleOptions(option)
                }}/>
              <p className={`--checkoption ${isMultipleSelected(option)}`}>
                {multipleSelectOptions[option]}
              </p>
            </div>
          })
        }
      </div>
   
      <InputContainer />
  </section>
}