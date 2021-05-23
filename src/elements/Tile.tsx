import React from 'react';

export const Tile = (props: any) => {
    let className = 'app__panel__tile';
    if (props.classSuffix) {
        className = className + ' ' + className + '--' + props.classSuffix;
    }

    return (
        <div className={className} title={props.title}>
            <big>
                {props.value}
                {props.unit}
            </big>
            <small>
                {props.prefixAdd}
                {props.valueAdd}
                {props.unitAdd}
            </small>
        </div>
    )
}
