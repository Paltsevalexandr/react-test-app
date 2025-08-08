import React from 'react'

export default function Errors({errors, styles={}}) {
  return (
	  <p className='errors'
		  style={{
			  display: errors.length > 0 ? 'block' : 'none',
			  ...styles
		  }}
	  >
        {
            errors.map((error, index) => {
                return (
                    <span key={`error-span-${index}`}>
                        {
                            index > 0 && errors.length > 1
                                ? <br />
                                : null
                        }
                        {error}
                    </span>
                )
            })
        }
    </p>
  )
}
