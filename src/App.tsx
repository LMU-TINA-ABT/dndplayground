import React, {useState} from 'react';
import {DndContext, DragOverlay} from '@dnd-kit/core';
import {Draggable} from './components/draggable/Draggable';
import {Stack} from "@mui/material";
import {Droppable} from "./components/droppable/Droppable";
import {Item, ItemProps} from "./components/draggable/Item";
import {arrayMove} from "@dnd-kit/sortable";

function App() {
    const [activeId, setActiveId] = useState("null");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<ItemProps[]>([{id: "Start"}]);
    const [number, setNumber] = useState<number>(1);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Stack direction={"row"} spacing={6}>
                <div>
                    Hier ist eine Liste von Bausteinen
                    <Stack direction={"column"}>
                        <Draggable id="one" isInAlgorithm={false}/>
                        <Draggable id="two" isInAlgorithm={false}/>
                        <Draggable id="three" isInAlgorithm={false}/>
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

    function getNumber() {
        setNumber(number + 1);
        return number;
    }

    function handleDragEnd(event: any) {
        const {over, active} = event;

        setActive(false);

        if (over && !active.data.current.isInAlgorithm) {
            const index = items.indexOf(items.find(item => item.id === over.id)!);
            const newItems = [...items];
            newItems.splice(index, 0, {id: active.id + getNumber()})
            setItems(newItems);
        } else if (over) {
            if (active.id !== over.id) {
                setItems((items) => {
                    const oldIndex = items.indexOf(items.find(item => item.id === active.id)!);
                    const newIndex = items.indexOf(items.find(item => item.id === over.id)!);
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    }
};

export default App;