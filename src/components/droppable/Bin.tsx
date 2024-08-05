import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import DeleteIcon from '@mui/icons-material/Delete';

type DroppableProps = {
    id: string
}

export function Bin(props: DroppableProps) {

    const {setNodeRef: setSecondDroppableRef} = useDroppable({
        id: props.id
    });

    return (
        <div ref={setSecondDroppableRef}>
            <DeleteIcon />
        </div>
    );
}


