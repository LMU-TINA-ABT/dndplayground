import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';
import {Draggable} from './components/draggable/Draggable';
import {Stack} from "@mui/material";
import {Droppable} from "./components/droppable/Droppable";
import {Item, ItemProps} from "./components/draggable/Item";

function App() {
    const [activeId, setActiveId] = useState("null");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<ItemProps[]>([{id: "Start"}]);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Stack direction={"row"} spacing={6}>
                <div>
                    Hier ist eine Liste von Bausteinen
                    <Stack direction={"column"}>
                        <Draggable id="one"><Item id={"one"}/></Draggable>
                        <Draggable id="two"><Item id={"two"}/></Draggable>
                        <Draggable id="three"><Item id={"three"}/></Draggable>
                    </Stack>
                </div>
                <div>
                    <Droppable id={"droppable"} items={items}></Droppable>
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

        if (over) {
            setItems([...items, {id: active.id}]);
        }
    }
};

export default App;