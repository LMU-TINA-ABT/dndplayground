import React from 'react';
import {Item} from "./Item";
import {useSortable} from "@dnd-kit/sortable";

type DraggableProps = {
    id: string,
    isInAlgorithm: boolean
}

export const Sortable: React.FC<DraggableProps> = (props: DraggableProps) => {
    const {attributes, listeners, setNodeRef, transform} = useSortable({
        id: props.id,
        data: {isInAlgorithm: props.isInAlgorithm}
    });

    const style = transform ? {
        zIndex: 500
        //transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Item id={props.id}/>
        </div>
    );
};

export default Sortable;