import React, {useRef} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {Item} from "./Item";

type DraggableProps = {
    id: string,
    isInAlgorithm: boolean
}

export const Draggable: React.FC<DraggableProps> = (props: DraggableProps) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data: {isInAlgorithm: props.isInAlgorithm}
    });

    const style = transform ? {
        zIndex: 500
        //transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Item id={props.id} />
        </div>
    );
};

export default Draggable;