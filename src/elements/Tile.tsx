import React from 'react';
import {getWeatherIconUrl} from "../components/WeatherApiData";

export const Tile = (props: any) => {
    const classNameBase = 'app__panel__tile';
    let className = classNameBase;
    if (props.classSuffix) {
        className = classNameBase + ' ' + classNameBase + '--' + props.classSuffix;
    }

    return (
        <div className={className} title={props.title}>

            {props.icon
                ?
                <big className={classNameBase + '__icon'}>
                    <img
                        src={getWeatherIconUrl(props.icon)}
                        alt={props.value + (props.unit || '')}
                        title={props.value + (props.unit || '')}
                    />
                </big>
                :
                <big>
                    {props.value}
                    {props.unit || ''}
                </big>
            }

            <small>
                {props.prefixAdd || ''}
                {props.valueAdd}
                {props.unitAdd || ''}
            </small>
        </div>
    )
}
