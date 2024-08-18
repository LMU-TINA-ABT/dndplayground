import React, {useState} from 'react';
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {BuildingBlock} from './components/draggable/BuildingBlock';
import {Stack} from "@mui/material";
import {AlgorithmContainer} from "./components/droppable/AlgorithmContainer";
import {ItemProps, MyItem} from "./components/draggable/MyItem";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {Bin} from "./components/droppable/Bin";

function App() {
    const [activeId, setActiveId] = useState("null");
    const [activeType, setActiveType] = useState<"blue" | "yellow" | "green" | "pink">("pink");
    const [isActive, setIsActive] = useState(true);
    const [items, setItems] = useState<ItemProps[]>([]);
    const [number, setNumber] = useState<number>(1);
    const [myText, setMyText] = useState<string>("start");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}
                     sensors={sensors}>
            <div>{myText}</div>
            <Stack direction={"row"} spacing={6} justifyContent={"space-between"}>
                <div style={{margin: "25px"}}>
                    <Stack direction={"column"}>
                        <BuildingBlock id="one" isInAlgorithm={false} type={"blue"}/>
                        <BuildingBlock id="two" isInAlgorithm={false} type={"yellow"}/>
                        <BuildingBlock id="three" isInAlgorithm={false} type={"green"}/>
                    </Stack>
                </div>
                <div style={{margin: "25px"}}>
                    <AlgorithmContainer id={"algorithmContainer"} items={items}></AlgorithmContainer>
                </div>
                <div style={{margin: "25px"}}>
                    <Bin id={"bin"}></Bin>
                </div>
            </Stack>
            <DragOverlay>
                {isActive ? <MyItem isOverlay={true} id={activeId} type={activeType}/> : null}
            </DragOverlay>
        </DndContext>
    );

    function handleDragStart(event: any) {
        setIsActive(true);
        setActiveType(event.active.data.current.type);
        setActiveId(event.active.id);
    }

    function getNumber() {
        setNumber(number + 1);
        return number;
    }

    function handleDragOver(event: any) {
        const {over, active} = event;
        setMyText(over && over.id ? over.id : "nothing");
    }

    function handleDragEnd(event: any) {
        const {over, active} = event;

        setIsActive(false);

        const isTop = active?.rect?.current?.translated?.top > over?.rect?.top;

        if (over && over.id === "bin" && active.data.current.isInAlgorithm) {
            const newItems = [...items];
            const filteredItems = newItems.filter(item => item.id != active.id);
            setItems(filteredItems);
        }

        if (over && over.id !== "bin" && !active.data.current.isInAlgorithm) {
            const index = items.indexOf(items.find(item => item.id === over.id)!);
            const newItems = [...items];
            newItems.splice(index, 0, {id: active.id + getNumber(), isOverlay:false, type: activeType})
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

