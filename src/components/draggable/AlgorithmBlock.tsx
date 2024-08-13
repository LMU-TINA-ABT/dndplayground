import React from 'react';
import {MyItem} from "./MyItem";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

type DraggableProps = {
    id: string,
    isInAlgorithm: boolean,
    isNonDraggable?: boolean
}

export const AlgorithmBlock: React.FC<DraggableProps> = (props: DraggableProps) => {
    const {
        isOver,
        attributes,
        listeners,
        setNodeRef: useAlgorithmBlockRef,
        transform,
        transition
    } = useSortable({
        id: props.id,
        data: {isInAlgorithm: props.isInAlgorithm},
        disabled: props.isNonDraggable
    });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={useAlgorithmBlockRef} style={style} {...attributes} {...listeners}>
            <MyItem isOverlay={false} id={props.id} isOver={isOver}/>
        </div>
    );
};

export default AlgorithmBlock;