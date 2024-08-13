import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {MyItem} from "./MyItem";

type DraggableProps = {
    id: string,
    isInAlgorithm: boolean
}

export const BuildingBlock: React.FC<DraggableProps> = (props: DraggableProps) => {
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
            <MyItem id={props.id} isOverlay={false} />
        </div>
    );
};

export default BuildingBlock;