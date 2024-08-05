import React from 'react';
import {ItemProps} from "../draggable/Item";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import Sortable from "../draggable/Sortable";

type DroppableProps = {
    id: string,
    items: ItemProps[]
}

export function Droppable(props: DroppableProps) {

    return (
        <SortableContext
            strategy={rectSortingStrategy}
            items={props.items}>
            {props.items.map(item => <Sortable isInAlgorithm={true} key={item.id} id={item.id}/>)}
        </SortableContext>
    );
}


