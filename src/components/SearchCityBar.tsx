import React from 'react';

export const SearchCityBar = (props: any) => {
    return (
        <div className={props.className}>
            <input
                type="text"
                placeholder="Enter a city"
                value={props.searchCity}
                onChange={props.onChangeHandler}
                onKeyDown={props.onKeyDownHandler}
            />
            <button
                type="submit"
                onClick={props.onClickHandler}
            >
                Search
            </button>

        </div>
    )
}
