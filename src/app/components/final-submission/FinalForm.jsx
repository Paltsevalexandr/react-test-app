import React from 'react'

export default function FinalForm({
    styles, totalParts,
    setTotalParts, errors,
    finalSubmit
}) {
  return (
    <form className={styles.final__form}>
        <label htmlFor="total-parts"
            className={styles.final__label}>
                <span className={styles['final__label-text']}>
                    Total Parts
                </span>
                <input
                    className={styles.final__input}
                    value={totalParts}
                    onChange={(e) => setTotalParts(+e.target.value)}
                    type="number"
                    name="total-parts"
                    id="total-parts" />
            </label>
            {
                errors.length > 0
                ?  <p className={styles.final__errors}>
                    {errors}
                </p>
                : null
            }
            <button type="submit" className={styles['final__btn']}
              onClick={(e) => {
                  e.preventDefault();
                  finalSubmit();
              }}>
                Submit
            </button>
    </form>
  )
}
