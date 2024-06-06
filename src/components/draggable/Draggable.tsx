import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props: any) {
    // todo: use hook, set id
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });

    // todo: transform to move around
    const style = transform ? {
        //transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    // todo: set ref Node, listeners and attributes
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
};

export default Draggable;

/* todo: Draggableattributes:
    role: string;
    tabIndex: number;
    'aria-disabled': boolean;
    'aria-pressed': boolean | undefined;
    'aria-roledescription': string;
    'aria-describedby': string; */