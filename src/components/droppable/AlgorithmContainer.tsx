import React from 'react';
import {ItemProps} from "../draggable/MyItem";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import AlgorithmBlock from "../draggable/AlgorithmBlock";
import {useDroppable} from "@dnd-kit/core";
import {Stack} from "@mui/material";

type DroppableProps = {
    id: string,
    items: ItemProps[]
}

export function AlgorithmContainer(props: DroppableProps) {

    const style = {
        width: 100,
        minHeight: 500,
        display: "flex",
        alignItems: "flex-start",
        border: "1px solid black",
        padding: "10px 10px 10px 10px",
        background: "white"
    };

    const {setNodeRef} = useDroppable({
        id: props.id
    });

    return (
        <SortableContext
            strategy={verticalListSortingStrategy}
            items={props.items}
        >
            <Stack ref={setNodeRef} style={style} direction={"column"} justifyContent={"flex-start"}>
                {props.items.map(item => <AlgorithmBlock isInAlgorithm={true} key={item.id} id={item.id} type={item.type}/>)}
            </Stack>
        </SortableContext>
    );
}


