import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {Item, ItemProps} from "../draggable/Item";

type DroppableProps = {
    id: string,
    items: ItemProps[]
}

export function Droppable(props: DroppableProps) {

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


    return (
        <div ref={setNodeRef} style={style}>
            {props.items.map((item: ItemProps) => {
               return <Item id={item.id} />
            })}
        </div>
    );
}