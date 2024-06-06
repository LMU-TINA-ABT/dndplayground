import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props: any) {

    // todo: use hook, set id
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });

    const style = {
        color: isOver ? 'green' : "black",
        borderStyle: "solid",
        borderColor: isOver ? "green" : "black",
        width: "300px",
        height: "300px"
    };


    // todo: set refs
    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
            {props.text}
        </div>
    );
}