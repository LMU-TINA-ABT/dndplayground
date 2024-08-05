import React from 'react';
import {ItemProps} from "../draggable/Item";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Sortable from "../draggable/Sortable";

type DroppableProps = {
    id: string,
    items: ItemProps[]
}

export function Droppable(props: DroppableProps) {

    return (
        <SortableContext
            strategy={verticalListSortingStrategy}
            items={props.items}>
            {props.items.map(item => <Sortable isInAlgorithm={true} key={item.id} id={item.id}/>)}
        </SortableContext>
    );
}


