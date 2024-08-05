import React from 'react';
import {Item} from "./Item";
import {useSortable} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";

type DraggableProps = {
    id: string,
    isInAlgorithm: boolean
}

export const Sortable: React.FC<DraggableProps> = (props: DraggableProps) => {
    const {attributes, listeners, setNodeRef: useSortableRef, transform} = useSortable({
        id: props.id,
        data: {isInAlgorithm: props.isInAlgorithm}
    });

    const {setNodeRef: setThirdDroppableRef} = useDroppable({
        id: "container"
    });

    const style = transform ? {
        zIndex: 500
        //transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div style={{backgroundColor: "red"}} ref={setThirdDroppableRef}>
            <div ref={useSortableRef} style={style} {...listeners} {...attributes}>
                <Item id={props.id}/>
            </div>
        </div>
    );
};

export default Sortable;