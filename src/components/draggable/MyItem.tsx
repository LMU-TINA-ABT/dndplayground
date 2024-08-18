
export type ItemProps = {
    id: string;
    isOverlay: boolean;
    isOver?: boolean;
    type: "blue" | "yellow" | "green" | "pink"
}

export const MyItem: React.FC<ItemProps> = (props: ItemProps) => {

    function getBackgroundColor() {
        // if (props.isOverlay) {
        //     return "grey";
        // } else if (props.isOver) {
        //     return "red";
        // } else {
            return props.type;
        // }
    }

    const style = {
        width: 100,
        height: 50,
        backgroundColor: getBackgroundColor(),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px 0",
        cursor: "grab"
    };

    return(
        <div style={style}>I am {props.id} </div>
    )
}