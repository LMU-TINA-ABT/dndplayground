import React, {useState} from 'react';
import {closestCenter, closestCorners, DndContext, DragOverlay} from '@dnd-kit/core';
import {Draggable} from './components/draggable/Draggable';
import {Stack} from "@mui/material";
import {Droppable} from "./components/droppable/Droppable";
import {Item, ItemProps} from "./components/draggable/Item";
import {arrayMove} from "@dnd-kit/sortable";
import {Bin} from "./components/droppable/Bin";

function App() {
    const [activeId, setActiveId] = useState("null");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<ItemProps[]>([{id: "Start"}]);
    const [number, setNumber] = useState<number>(1);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter}>
            <Stack direction={"row"} spacing={6}>
                <div style={{margin: "25px"}}>
                    Hier ist eine Liste von Bausteinen
                    <Stack direction={"column"}>
                        <Draggable id="one" isInAlgorithm={false}/>
                        <Draggable id="two" isInAlgorithm={false}/>
                        <Draggable id="three" isInAlgorithm={false}/>
                    </Stack>
                </div>
                <div style={{margin: "25px"}}>
                    <Droppable id={"droppable"} items={items}></Droppable>
                </div>
                <div style={{margin: "25px"}}>
                    I am the bin
                    <Bin id={"bin"}></Bin>
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

        if (over && over.id === "bin" && active.data.current.isInAlgorithm) {
            const newItems = [...items];
            const filteredItems = newItems.filter(item => item.id != active.id);
            setItems(filteredItems);
        }

        if (over && over.id !== "bin" && !active.data.current.isInAlgorithm) {
            const index = items.indexOf(items.find(item => item.id === over.id)!);
            const newItems = [...items];
            newItems.splice(index, 0, {id: active.id + getNumber()})
            setItems(newItems);
        } else if (over && over.id !== "bin") {
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

