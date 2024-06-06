import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Stack} from "@mui/material";
import {Droppable} from "./Droppable";
import Item from "./Item";

function App() {
    const [activeId, setActiveId] = useState("null");
    const [active, setActive] = useState(true);
    const [text, setText] = useState("");

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Stack direction={"row"} spacing={6}>
                <div>
                    Hier ist eine Liste von Bausteinen
                    <Stack direction={"column"}>
                            <Draggable id="one"><Item id={"one"} /></Draggable>
                            <Draggable id="two"><Item id={"two"} /></Draggable>
                            <Draggable id="three"><Item id={"three"} /></Draggable>
                    </Stack>
                </div>
                <div>
                    Hier ist eine Droparea
                    <Droppable id={"droppable"} text={text}></Droppable>
                </div>
            </Stack>
            <DragOverlay>
                {active ? <Item id={activeId}/> : null}
            </DragOverlay>
        </DndContext>
    );

    function handleDragStart(event: any) {
        setActive(true);
        setActiveId(event.active.id);
    }

    function handleDragEnd(event: any) {
        const {over, active} = event;

        setActive(false);

        if(over) {
            setText(text + active.id);
        }


        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        /*        if (active && active.id === "draggable") {
                    setParent(over ? over.id : null);
                } else {
                    // todo: swap sortable ids
                    if (active.id !== over.id) {
                        setItems((items) => {
                            const oldIndex = items.indexOf(active.id);
                            const newIndex = items.indexOf(over.id);

                            return arrayMove(items, oldIndex, newIndex);
                        });
                    }
                }*/
    }
};

export default App;