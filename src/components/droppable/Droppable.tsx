import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import {ItemProps} from "../draggable/Item";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Sortable from "../draggable/Sortable";

type DroppableProps = {
    id: string,
    items: ItemProps[]
}

export function Droppable(props: DroppableProps) {

    const {isOver, setNodeRef} = useDroppable({
        id: props.id
    });

    const style = {
        zIndex: 100,
        color: isOver ? 'green' : "black",
        borderStyle: "solid",
        borderColor: isOver ? "green" : "black",
        width: "300px",
        height: "300px"
    };


    return (
        <SortableContext
            strategy={verticalListSortingStrategy}
            items={props.items}>
            {props.items.map(item => <Sortable isInAlgorithm={true} key={item.id} id={item.id}/>)}
        </SortableContext>
    );
}


